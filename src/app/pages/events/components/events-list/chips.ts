export const CHIPS: Chip[] = [
  { icon: 'desktop-outline', label: 'label.type.post.event', style: 'blog' },
  {
    icon: 'caret-forward-circle-outline',
    label: 'label.type.video.event',
    style: 'video',
  },
  {
    icon: 'videocam-outline',
    label: 'label.type.streaming.event',
    style: 'streaming',
  },
  { icon: 'ticket-outline', label: 'label.type.udemy.event', style: 'udemy' },
];

interface Chip {
  icon: string;
  label: string;
  style: string;
}
