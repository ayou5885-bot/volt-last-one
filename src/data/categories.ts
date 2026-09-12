import type { Category } from '@/types/product';
import { images } from './images';

export const categories: Category[] = [
  { id: 'laptops', name: 'Laptops', slug: 'laptops', description: 'Portable power for work and play', image: images.laptop },
  { id: 'desktop-pcs', name: 'Desktop PCs', slug: 'desktop-pcs', description: 'Reliable workstations for every desk', image: images.desktopPc },
  { id: 'gaming-pcs', name: 'Gaming PCs', slug: 'gaming-pcs', description: 'High-performance rigs built to win', image: images.gamingPc },
  { id: 'monitors', name: 'Monitors', slug: 'monitors', description: 'Crisp, color-accurate displays', image: images.monitor },
  { id: 'graphics-cards', name: 'Graphics Cards', slug: 'graphics-cards', description: 'Desktop-class rendering and ray tracing', image: images.graphicsCard },
  { id: 'cpus', name: 'CPUs', slug: 'cpus', description: 'Processors for every workload', image: images.cpu },
  { id: 'motherboards', name: 'Motherboards', slug: 'motherboards', description: 'The foundation of your build', image: images.motherboard },
  { id: 'ram', name: 'RAM', slug: 'ram', description: 'Memory that keeps up with you', image: images.ram },
  { id: 'ssds', name: 'SSDs', slug: 'ssds', description: 'Blazing-fast solid-state storage', image: images.ssd },
  { id: 'hdds', name: 'HDDs', slug: 'hdds', description: 'High-capacity hard drives', image: images.hdd },
  { id: 'mice', name: 'Mice', slug: 'mice', description: 'Precision pointers for every grip', image: images.mouse },
  { id: 'keyboards', name: 'Keyboards', slug: 'keyboards', description: 'Tactile typing and custom layouts', image: images.keyboard },
  { id: 'headsets', name: 'Headsets', slug: 'headsets', description: 'Immersive audio for gaming and calls', image: images.headset },
  { id: 'webcams', name: 'Webcams', slug: 'webcams', description: 'Crisp video for streaming and meetings', image: images.webcam },
  { id: 'speakers', name: 'Speakers', slug: 'speakers', description: 'Room-filling sound, desk-sized', image: images.speakers },
  { id: 'pc-cases', name: 'PC Cases', slug: 'pc-cases', description: 'Showcase your build in style', image: images.pcCase },
  { id: 'power-supplies', name: 'Power Supplies', slug: 'power-supplies', description: 'Clean, reliable power delivery', image: images.powerSupply },
  { id: 'cpu-coolers', name: 'CPU Coolers', slug: 'cpu-coolers', description: 'Keep temps low and clocks high', image: images.cpuCooler },
  { id: 'accessories', name: 'Accessories', slug: 'accessories', description: 'Cables, hubs, and everyday essentials', image: images.accessories },
];
