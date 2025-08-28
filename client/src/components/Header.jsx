const posts = [
    {
        id: 1,
        title: 'Kelola Kost Lebih Mudah',
        href: '#',
        description:
            'Dengan MyKost Management, pemilik kost bisa mengatur kamar, harga, dan penyewa secara praktis dalam satu platform.',
        date: 'Agu 28, 2025',
        datetime: '2025-08-28',
        category: { title: 'Management', href: '#' },
        author: {
            name: 'Rina Saputra',
            role: 'Owner Kost Exclusive',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
        },
    },
    {
        id: 2,
        title: 'Cari Kost Jadi Lebih Cepat',
        href: '#',
        description:
            'Pencari kost dapat menemukan kamar sesuai lokasi, harga, dan fasilitas favorit hanya dengan beberapa klik.',
        date: 'Agu 20, 2025',
        datetime: '2025-08-20',
        category: { title: 'Booking', href: '#' },
        author: {
            name: 'Andi Wijaya',
            role: 'Mahasiswa',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
        },
    },
    {
        id: 3,
        title: 'Pantau Penyewa dan Pembayaran',
        href: '#',
        description:
            'Sistem otomatis memudahkan pemilik kost memantau penyewa, jatuh tempo pembayaran, hingga laporan bulanan.',
        date: 'Agu 15, 2025',
        datetime: '2025-08-15',
        category: { title: 'Finance', href: '#' },
        author: {
            name: 'Dewi Lestari',
            role: 'Manajer Kost',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80',
        },
    },
]


export default function Example() {
    return (
        <div className="bg-gray-100 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        MyKost Management
                    </h2>
                    <p className="mt-3 text-lg text-gray-600">
                        Mau cari kos? Atur, kelola, dan sewa kost lebih mudah dengan <span className="font-semibold text-indigo-600">MyKost Management</span>.
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={post.datetime} className="text-gray-500">
                                    {post.date}
                                </time>
                                <a
                                    href={post.category.href}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {post.category.title}
                                </a>
                            </div>
                            <div className="group relative grow">
                                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                                    <a href={post.href}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm text-gray-600">{post.description}</p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                                <div className="text-sm">
                                    <p className="font-semibold text-gray-900">
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{post.author.role}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
