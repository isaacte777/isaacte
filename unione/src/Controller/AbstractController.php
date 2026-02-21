<?php

namespace UnioneApp\Controller;

use App\Kernel\Controllers\BaseController;
use App\Kernel\Controllers\ControllerInterface;
use Klein\App;
use Klein\Klein;

abstract class AbstractController extends BaseController implements ControllerInterface
{
    protected string $media_server = '';
    public array $css_files = [];

    public function __construct($uri, Klein $router)
    {
        parent::__construct($uri, $router);
    }

    // ── Shared Data ─────────────────────────────────────────────

    protected function getSiteConfig(): array
    {
        return [
            'title'       => 'Unione Partners | The Unified Gateway for Affiliates',
            'description' => 'Seamlessly connect your revenue share and CPA platforms. Empower your publishers with elite tools.',
            'author'      => 'Unione Partners',
            'year'        => date('Y'),
            'email'       => 'contact@unione.partners',
            'url'         => 'https://unione.partners',
        ];
    }

    protected function getNavSections(): array
    {
        return [
            ['label' => 'Challenge',    'id' => 'challenge',    'icon' => 'target'],
            ['label' => 'Solution',     'id' => 'solution',     'icon' => 'lightbulb'],
            ['label' => 'Advertisers',  'id' => 'advertisers',  'icon' => 'megaphone'],
            ['label' => 'Publishers',   'id' => 'publishers',   'icon' => 'file-text'],
            ['label' => 'How It Works', 'id' => 'how-it-works', 'icon' => 'settings'],
            ['label' => 'Why Us',       'id' => 'why-unione',   'icon' => 'star'],
        ];
    }

    protected function getFooterLinks(): array
    {
        return [
            'product' => [
                ['label' => 'For Advertisers', 'href' => '/#advertisers'],
                ['label' => 'For Publishers',  'href' => '/#publishers'],
                ['label' => 'Developers',      'href' => '#'],
            ],
            'company' => [
                ['label' => 'Careers', 'href' => '/pages/careers'],
                ['label' => 'Contact', 'href' => '/pages/contact'],
            ],
            'legal' => [
                ['label' => 'Privacy Policy',   'href' => '/pages/privacy-policy'],
                ['label' => 'Terms of Service',  'href' => '/pages/terms-of-service'],
                ['label' => 'Cookie Policy',     'href' => '/pages/cookie-policy'],
            ],
        ];
    }

    protected function getDropdownItems(): array
    {
        return [
            'leftSecondary'  => ['path' => '/pages/terms-of-service', 'route' => '/terms-of-service', 'title' => 'Terms of Service', 'icon' => 'scroll-text'],
            'leftPrimary'    => ['path' => '/pages/careers',          'route' => '/careers',          'title' => 'Careers',          'icon' => 'briefcase'],
            'centerPrimary'  => ['path' => '/pages/contact',          'route' => '/contact',          'title' => 'Contact',          'icon' => 'mail'],
            'rightPrimary'   => ['path' => '/pages/privacy-policy',   'route' => '/privacy-policy',   'title' => 'P. Policy',        'icon' => 'shield'],
            'rightSecondary' => ['path' => '/pages/cookie-policy',    'route' => '/cookie-policy',    'title' => 'Cookie Policy',    'icon' => 'cookie'],
        ];
    }

    protected function getIconsSvg(): array
    {
        return [
            'target'       => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
            'lightbulb'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
            'megaphone'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
            'file-text'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
            'settings'     => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
            'star'         => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
            'mail'         => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
            'briefcase'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
            'shield'       => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
            'scroll-text'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M15 8h-5"/><path d="M15 12h-5"/></svg>',
            'cookie'       => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>',
            'chevron-down' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
        ];
    }

    // ── Template Rendering ──────────────────────────────────────

    protected function getBaseContext(string $currentPage, ?array $currentInternalPage = null): array
    {
        return [
            'media_server'          => $this->media_server,
            'css_files'             => $this->css_files,
            'site_config'           => $this->getSiteConfig(),
            'nav_sections'          => $this->getNavSections(),
            'footer_links'          => $this->getFooterLinks(),
            'icons_svg'             => $this->getIconsSvg(),
            'dropdown_items'        => $this->getDropdownItems(),
            'current_page'          => $currentPage,
            'current_internal_page' => $currentInternalPage,
        ];
    }

    protected function renderPage(App $app, string $template, string $currentPage, ?array $currentInternalPage = null, array $extra = []): string
    {
        $context = array_merge($this->getBaseContext($currentPage, $currentInternalPage), $extra);
        return $app->twig->render($template, $context);
    }

    // ── CSS Loader ──────────────────────────────────────────────

    protected function get_css_files(string $style): void
    {
        $this->css_files = [
            'variables'  => $this->media_server . 'assets/css/variables.css',
            'global'     => $this->media_server . 'assets/css/global.css',
            'navigation' => $this->media_server . 'assets/css/navigation.css',
        ];

        match ($style) {
            'home' => $this->css_files = array_merge($this->css_files, [
                'home'       => $this->media_server . 'assets/css/home.css',
                'responsive' => $this->media_server . 'assets/css/responsive.css',
            ]),
            'form' => $this->css_files = array_merge($this->css_files, [
                'forms' => $this->media_server . 'assets/css/forms.css',
                'legal' => $this->media_server . 'assets/css/legal.css',
            ]),
            default => $this->css_files['legal'] = $this->media_server . 'assets/css/legal.css',
        };
    }

    // ── Environment Variable Helper ─────────────────────────────

    /**
     * Read an environment variable from $_ENV, $_SERVER, or getenv() (in that order).
     * Works with both safe and unsafe Dotenv configurations.
     */
    protected function env(string $key, string $default = ''): string
    {
        return $_ENV[$key] ?? $_SERVER[$key] ?? (getenv($key) ?: $default);
    }
}