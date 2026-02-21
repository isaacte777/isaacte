<?php

namespace UnioneApp\Controller;

use Klein\App;
use Klein\Klein;
use Klein\Request;
use Klein\Response;
use Klein\ServiceProvider;

class IndexController extends AbstractController
{
    public function __construct($uri, Klein $router)
    {
        parent::__construct($uri, $router);
        $this->media_server = 'https://media.unione.partners/';
    }

    public function run(): void
    {
        // Home
        $this->respond('get', $this->relativeRoute(), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('home');
            return $this->renderPage($app, 'pages/index.html.twig', 'index', null, [
                'active_section' => 'challenge',
            ]);
        });

        // Careers (GET)
        $this->respond('get', $this->relativeRoute('pages/careers'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('form');
            return $this->renderPage($app, 'pages/careers.html.twig', 'careers', ['title' => 'Careers', 'icon' => 'briefcase'], [
                'job_positions' => $this->getJobPositions(),
            ]);
        });

        // Careers (POST) — Upload CV to S3, send to Rocket.Chat webhook
        $this->respond('post', $this->relativeRoute('pages/careers'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('form');

            $renderError = function (string $msg) use ($app) {
                return $this->renderPage($app, 'pages/careers.html.twig', 'careers', ['title' => 'Careers', 'icon' => 'briefcase'], [
                    'job_positions' => $this->getJobPositions(),
                    'error'         => $msg,
                ]);
            };

            // ─── Config (from environment variables) ───
            $webhookToken    = $this->env('ROCKETCHAT_WEBHOOK_TOKEN');
            $webhookUrl      = 'https://intra-rc.feedh.net/hooks/698f184be21617f2175ee656/' . $webhookToken;
            $turnstileSecret = $this->env('TURNSTILE_SECRET_KEY');

            $s3Key       = $this->env('DO_KEY');
            $s3Secret    = $this->env('DO_SECRET');
            $s3Region    = 'fra1';
            $s3Bucket    = 'unione';
            $s3Endpoint  = 'https://fra1.digitaloceanspaces.com';
            $s3CdnDomain = 'fra1.digitaloceanspaces.com';

            // ─── Fields ───
            $fullName = trim($request->param('fullName', ''));
            $email    = trim($request->param('email', ''));
            $message  = trim($request->param('message', ''));

            // ─── Turnstile ───
            $turnstileResponse = $request->param('cf-turnstile-response', '');
            if (empty($turnstileResponse)) {
                return $renderError('Please complete the captcha verification.');
            }

            $verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
            $ch = curl_init($verifyUrl);
            curl_setopt_array($ch, [
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => http_build_query([
                    'secret'   => $turnstileSecret,
                    'response' => $turnstileResponse,
                    'remoteip' => $request->ip(),
                ]),
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 10,
            ]);
            $verifyResult = json_decode(curl_exec($ch), true);
            curl_close($ch);

            if (empty($verifyResult['success'])) {
                return $renderError('Captcha verification failed. Please try again.');
            }

            // ─── Validation ───
            if (empty($fullName) || empty($email) || empty($message)) {
                return $renderError('Please fill in all required fields.');
            }
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return $renderError('Please enter a valid email address.');
            }

            // ─── File Upload to S3 ───
            $cvFile = $_FILES['cv'] ?? null;
            if (!$cvFile || $cvFile['error'] !== UPLOAD_ERR_OK) {
                return $renderError('Please upload your CV (PDF).');
            }
            if ($cvFile['size'] > 5 * 1024 * 1024) {
                return $renderError('File size must not exceed 5MB.');
            }

            $finfo    = new \finfo(FILEINFO_MIME_TYPE);
            $mimeType = $finfo->file($cvFile['tmp_name']);
            if ($mimeType !== 'application/pdf') {
                return $renderError('Only PDF files are accepted.');
            }

            $safeFullName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $fullName);
            $s3Path       = 'careers/cv/' . date('Y/m/') . time() . '_' . $safeFullName . '.pdf';
            $fileContent  = file_get_contents($cvFile['tmp_name']);

            $s3Url = $this->uploadToS3($s3Endpoint, $s3Bucket, $s3Region, $s3Key, $s3Secret, $s3Path, $fileContent, $mimeType);

            if (!$s3Url) {
                return $renderError('Failed to upload your CV. Please try again later.');
            }

            $publicUrl = "https://{$s3Bucket}.{$s3CdnDomain}/{$s3Path}";

            // ─── Rocket.Chat Webhook ───
            $payload = json_encode([
                'alias' => 'Careers Application',
                'text'  => "📋 *New Career Application*",
                'attachments' => [
                    [
                        'title' => "Application: {$fullName}",
                        'text'  => "**Name:** {$fullName}\n**Email:** {$email}\n\n{$message}\n\n📎 [Download CV]({$publicUrl})",
                        'color' => '#764FA5',
                    ],
                ],
            ]);

            $ch = curl_init($webhookUrl);
            curl_setopt_array($ch, [
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => $payload,
                CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 10,
            ]);
            $result   = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode >= 200 && $httpCode < 300) {
                return $this->renderPage($app, 'pages/careers.html.twig', 'careers', ['title' => 'Careers', 'icon' => 'briefcase'], [
                    'job_positions' => $this->getJobPositions(),
                    'success'       => 'Your application has been submitted successfully. We\'ll review it and get back to you soon!',
                ]);
            }

            return $renderError('Something went wrong. Please try again later.');
        });

        // Contact (GET)
        $this->respond('get', $this->relativeRoute('pages/contact'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('form');
            return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail']);
        });

        // Contact (POST) — Send to Rocket.Chat webhook
        $this->respond('post', $this->relativeRoute('pages/contact'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('form');

            // ─── Config (from environment variables) ───
            $webhookToken    = $this->env('ROCKETCHAT_WEBHOOK_TOKEN');
            $webhookUrl      = 'https://intra-rc.feedh.net/hooks/698f184be21617f2175ee656/' . $webhookToken;
            $turnstileSecret = $this->env('TURNSTILE_SECRET_KEY');

            // ─── Validate required env vars ───
            $missingVars = [];
            if (empty($webhookToken)) $missingVars[] = 'ROCKETCHAT_WEBHOOK_TOKEN';
            if (empty($turnstileSecret)) $missingVars[] = 'TURNSTILE_SECRET_KEY';
            if (!empty($missingVars)) {
                error_log('[Contact Form] Missing environment variables: ' . implode(', ', $missingVars));
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'error' => 'Something went wrong. Please try again later.',
                ]);
            }

            $fullName = trim($request->param('fullName', ''));
            $company  = trim($request->param('company', ''));
            $email    = trim($request->param('email', ''));
            $type     = trim($request->param('type', ''));
            $subject  = trim($request->param('subject', ''));
            $message  = trim($request->param('message', ''));

            // ── Turnstile Validation ────────────────────────────────
            $turnstileResponse = $request->param('cf-turnstile-response', '');
            if (empty($turnstileResponse)) {
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'error' => 'Please complete the captcha verification.',
                ]);
            }

            $verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
            $verifyPayload = http_build_query([
                'secret'   => $turnstileSecret,
                'response' => $turnstileResponse,
                'remoteip' => $request->ip(),
            ]);

            $ch = curl_init($verifyUrl);
            curl_setopt_array($ch, [
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => $verifyPayload,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 10,
            ]);
            $rawResponse = curl_exec($ch);
            $curlError = curl_error($ch);
            curl_close($ch);

            if ($curlError) {
                error_log('[Contact Form] Turnstile cURL error: ' . $curlError);
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'error' => 'Could not verify captcha. Please try again later.',
                ]);
            }

            $verifyResult = json_decode($rawResponse, true);

            if (empty($verifyResult['success'])) {
                error_log('[Contact Form] Turnstile failed: ' . $rawResponse);
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'error' => 'Captcha verification failed. Please try again.',
                ]);
            }
            // ────────────────────────────────────────────────────────

            // Validation
            if (empty($fullName) || empty($email) || empty($type) || empty($subject) || empty($message)) {
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'error' => 'Please fill in all required fields.',
                ]);
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'error' => 'Please enter a valid email address.',
                ]);
            }

            // Build Rocket.Chat payload
            $companyLine = $company ? " | Company: {$company}" : '';
            $payload = json_encode([
                'alias' => 'Website Contact Form',
                'text'  => "📩 *New Contact Form Submission*",
                'attachments' => [
                    [
                        'title'      => $subject,
                        'text'       => "**From:** {$fullName}{$companyLine}\n**Email:** {$email}\n**Type:** {$type}\n\n{$message}",
                        'color'      => '#764FA5',
                    ],
                ],
            ]);

            // Send to webhook
            $ch = curl_init($webhookUrl);
            curl_setopt_array($ch, [
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => $payload,
                CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 10,
            ]);
            $result  = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode >= 200 && $httpCode < 300) {
                return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                    'success' => 'Your message has been sent successfully. We\'ll get back to you soon!',
                ]);
            }

            return $this->renderPage($app, 'pages/contact.html.twig', 'contact', ['title' => 'Contact', 'icon' => 'mail'], [
                'error' => 'Something went wrong. Please try again later.',
            ]);
        });

        // Legal Pages
        $this->respond('get', $this->relativeRoute('pages/privacy-policy'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('legal');
            return $this->renderPage($app, 'pages/privacy-policy.html.twig', 'privacy-policy', ['title' => 'Privacy Policy', 'icon' => 'shield']);
        });

        $this->respond('get', $this->relativeRoute('pages/terms-of-service'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('legal');
            return $this->renderPage($app, 'pages/terms-of-service.html.twig', 'terms-of-service', ['title' => 'Terms of Service', 'icon' => 'scroll-text']);
        });

        $this->respond('get', $this->relativeRoute('pages/cookie-policy'), function (Request $request, Response $response, ServiceProvider $service, App $app) {
            $this->get_css_files('legal');
            return $this->renderPage($app, 'pages/cookie-policy.html.twig', 'cookie-policy', ['title' => 'Cookie Policy', 'icon' => 'cookie']);
        });
    }

    private function getJobPositions(): array
    {
        return [
            [
                'id'               => 1,
                'title'            => 'Fullstack Developer',
                'location'         => 'Remote / Hybrid',
                'type'             => 'Part time / Full time',
                'icon'             => 'code',
                'description'      => "We're looking for a talented Fullstack Developer to join our team and help build the future of affiliate marketing technology.",
                'responsibilities' => [
                    'Develop and maintain web applications using modern technologies',
                    'Collaborate with design and product teams',
                    'Write clean, maintainable, and efficient code',
                    'Participate in code reviews and technical discussions',
                ],
            ],
            [
                'id'               => 2,
                'title'            => 'Business Development Representative',
                'location'         => 'Remote / Hybrid',
                'type'             => 'Full time',
                'icon'             => 'briefcase',
                'description'      => 'Join our growing sales team to help expand our partner network and drive business growth.',
                'responsibilities' => [
                    'Identify and pursue new business opportunities',
                    'Build and maintain relationships with potential partners',
                    'Conduct market research and competitive analysis',
                    'Collaborate with the marketing team on outreach strategies',
                ],
            ],
        ];
    }

    /**
     * Upload a file to S3-compatible storage (DigitalOcean Spaces).
     * Uses AWS Signature V4 with raw cURL (no SDK required).
     */
    private function uploadToS3(
        string $endpoint,
        string $bucket,
        string $region,
        string $accessKey,
        string $secretKey,
        string $objectPath,
        string $fileContent,
        string $contentType
    ): ?string {
        $service   = 's3';
        $host      = "{$bucket}.{$region}.digitaloceanspaces.com";
        $url       = "https://{$host}/{$objectPath}";
        $date      = gmdate('Ymd');
        $amzDate   = gmdate('Ymd\THis\Z');
        $payloadHash = hash('sha256', $fileContent);

        // Canonical request
        $canonicalUri     = '/' . $objectPath;
        $canonicalQuery   = '';
        $canonicalHeaders = "content-type:{$contentType}\nhost:{$host}\nx-amz-content-sha256:{$payloadHash}\nx-amz-date:{$amzDate}\n";
        $signedHeaders    = 'content-type;host;x-amz-content-sha256;x-amz-date';

        $canonicalRequest = "PUT\n{$canonicalUri}\n{$canonicalQuery}\n{$canonicalHeaders}\n{$signedHeaders}\n{$payloadHash}";

        // String to sign
        $credentialScope = "{$date}/{$region}/{$service}/aws4_request";
        $stringToSign    = "AWS4-HMAC-SHA256\n{$amzDate}\n{$credentialScope}\n" . hash('sha256', $canonicalRequest);

        // Signing key
        $kDate    = hash_hmac('sha256', $date, "AWS4{$secretKey}", true);
        $kRegion  = hash_hmac('sha256', $region, $kDate, true);
        $kService = hash_hmac('sha256', $service, $kRegion, true);
        $kSigning = hash_hmac('sha256', 'aws4_request', $kService, true);

        $signature = hash_hmac('sha256', $stringToSign, $kSigning);

        $authHeader = "AWS4-HMAC-SHA256 Credential={$accessKey}/{$credentialScope}, SignedHeaders={$signedHeaders}, Signature={$signature}";

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_CUSTOMREQUEST  => 'PUT',
            CURLOPT_POSTFIELDS     => $fileContent,
            CURLOPT_HTTPHEADER     => [
                "Content-Type: {$contentType}",
                "Host: {$host}",
                "x-amz-content-sha256: {$payloadHash}",
                "x-amz-date: {$amzDate}",
                "Authorization: {$authHeader}",
                "x-amz-acl: public-read",
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 30,
        ]);

        $result   = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return ($httpCode >= 200 && $httpCode < 300) ? $url : null;
    }
}