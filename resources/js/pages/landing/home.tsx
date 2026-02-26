import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { Calendar, MapPin, BookOpen, Target, Lightbulb, Building2 } from 'lucide-react';

export default function LandingHome() {
    const newsEvents = [
        {
            id: 1,
            title: "Annual Innovation Summit 2026",
            date: "January 25, 2026",
            location: "Main Campus Auditorium",
            description: "Join us for our biggest innovation showcase featuring student projects and industry leaders."
        },
        {
            id: 2,
            title: "New Research Facility Opening",
            date: "February 1, 2026",
            location: "West Campus",
            description: "Grand opening of our state-of-the-art research and development center."
        },
        {
            id: 3,
            title: "International Education Fair",
            date: "February 15, 2026",
            location: "Conference Hall",
            description: "Explore global opportunities and connect with universities from around the world."
        }
    ];

    return (
        <LandingLayout>
            <Head title="Welcome" />
            {/* Hero Video Section */}
            <section className="relative h-96 md:h-[500px] overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 h-full flex items-center justify-center px-4">
                    <div className="text-center text-white max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to YourApp</h1>
                        <p className="text-lg md:text-xl mb-6">Empowering excellence through innovation and education</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                Get Started Free
                            </a>
                            <a href="#about" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News and Events */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest News & Events</h2>
                        <p className="text-gray-600">Stay updated with our upcoming events</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {newsEvents.map((event) => (
                            <div key={event.id} className="bg-blue-50 rounded-lg p-5 border border-blue-100 hover:shadow-lg transition">
                                <div className="flex items-center text-blue-600 mb-2 text-sm">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span className="font-semibold">{event.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                                <div className="flex items-center text-gray-600 mb-2 text-sm">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{event.location}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{event.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-12 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">About Us</h2>
                        <p className="text-gray-600">Discover our journey and values</p>
                    </div>

                    {/* History */}
                    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/4 bg-blue-600 p-6 flex items-center justify-center">
                                <BookOpen className="w-16 h-16 text-white" />
                            </div>
                            <div className="md:w-3/4 p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Our History</h3>
                                <p className="text-gray-700 mb-3">Founded in 1995, YourApp began as a small initiative to revolutionize organizational management. Over three decades, we've grown into a leading platform trusted worldwide.</p>
                                <p className="text-gray-700">Our journey reflects continuous innovation and unwavering commitment to excellence in empowering organizations with cutting-edge solutions.</p>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Target className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                            <p className="text-gray-700">To empower organizations with innovative solutions that streamline operations, enhance productivity, and drive sustainable growth through technology that makes a meaningful difference.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Lightbulb className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                            <p className="text-gray-700">To be the global leader in organizational management solutions, recognized for innovation, reliability, and commitment to enabling every organization to achieve its full potential.</p>
                        </div>
                    </div>

                    {/* Philosophy */}
                    <div className="mb-8 bg-blue-600 rounded-lg shadow-md p-8 text-white">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-4">Our Philosophy</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <h4 className="font-bold mb-2">Innovation First</h4>
                                <p className="text-sm opacity-90">Continuously pushing boundaries to deliver solutions that exceed user needs.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">User-Centric Design</h4>
                                <p className="text-sm opacity-90">Every feature designed with user experience and success at the forefront.</p>
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Integrity & Trust</h4>
                                <p className="text-sm opacity-90">Operating with transparency and commitment to lasting relationships.</p>
                            </div>
                        </div>
                    </div>

                    {/* The Campus */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex md:flex-row-reverse">
                            <div className="md:w-1/4 bg-orange-500 p-6 flex items-center justify-center">
                                <Building2 className="w-16 h-16 text-white" />
                            </div>
                            <div className="md:w-3/4 p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">The Campus</h3>
                                <p className="text-gray-700 mb-3">Our 50-acre campus features modern facilities designed to inspire creativity and collaboration, with cutting-edge technology labs, conference centers, and sustainable architecture.</p>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">50+</div>
                                        <div className="text-xs text-gray-600">Acres</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">15</div>
                                        <div className="text-xs text-gray-600">Buildings</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">100%</div>
                                        <div className="text-xs text-gray-600">Green Energy</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-3">Ready to Get Started?</h2>
                    <p className="text-lg mb-6 opacity-90">Join thousands of organizations that trust YourApp</p>
                    <a href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
                        Start Your Free Trial
                    </a>
                </div>
            </section>
        </LandingLayout>
    );
}