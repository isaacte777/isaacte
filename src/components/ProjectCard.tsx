import { motion } from 'motion/react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
  key?: string | number;
}

export default function ProjectCard({ title, category, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-medium">
          {category}
        </p>
        <h3 className="text-2xl font-serif font-light tracking-wide">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
