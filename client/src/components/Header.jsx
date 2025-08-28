import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";


const banners = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200", // ganti sesuai banner
        title: "Kelola Kost Lebih Mudah",
        desc: "Atur kamar, harga, dan penyewa secara praktis dalam satu platform.",
        color: "bg-indigo-600",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
        title: "Cari Kost Jadi Lebih Cepat",
        desc: "Temukan kamar sesuai lokasi, harga, dan fasilitas favorit.",
        color: "bg-green-600",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200",
        title: "Pantau Penyewa & Pembayaran",
        desc: "Sistem otomatis untuk pantau jatuh tempo & laporan bulanan.",
        color: "bg-orange-600",
    },
];



export default function Example() {
    const navigate = useNavigate();
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
                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
                    <Swiper
                        navigation
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner.id}>
                                <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="h-52 w-full object-cover"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-black/50 flex flex-col justify-end p-5 text-white`}
                                    >
                                        <h3 className="text-lg font-bold">{banner.title}</h3>
                                        <p className="text-sm">{banner.desc}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="flex justify-center mt-4">
                        <button onClick={() => navigate("/kos/search/:id")}
                            className="text-indigo-600 font-semibold hover:underline">
                            Lihat semua kost →
                        </button>
                    </div>
                </div>

                {/* <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                </div> */}
            </div>
        </div>
    )
}
