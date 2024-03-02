export const SidebarMenu = [
  {
    title: 'Dashboard',
    icon: 'ic:round-dashboard',
    link: '/',
  },
  {
    title: 'Master',
    icon: 'material-symbols:database',
    link: '#',
    child: [
      {
        childTitle: 'Agama',
        childLink: '/agama',
      },
      {
        childTitle: 'Pekerjaan',
        childLink: '/pekerjaan',
      },
      {
        childTitle: 'Pendidikan',
        childLink: '/pendidikan',
      },
      {
        childTitle: 'Penghasilan',
        childLink: '/penghasilan',
      },
    ],
  },
  {
    title: 'Users Management',
    icon: 'mdi:users',
    link: '/users',
  },
  {
    title: 'Sekolah',
    icon: 'emojione-monotone:school',
    link: '/sekolah',
  },
  {
    title: 'Pengajar',
    icon: 'mdi:teacher',
    link: '/pengajar',
  },
  {
    title: 'Kursus',
    icon: 'dashicons:welcome-learn-more',
    link: '/kursus',
  },
  {
    title: 'Pendaftar Kursus',
    icon: 'mdi:user-add',
    link: '/pendaftar-kursus',
  },
  {
    title: 'Pembayaran',
    icon: 'material-symbols:money',
    link: '/pembayaran',
  },
  {
    title: 'Pengumuman',
    icon: 'mdi:announcement',
    link: '/pengumuman',
  },
];
