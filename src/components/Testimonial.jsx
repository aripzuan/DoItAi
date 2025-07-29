import { Quote, Star, Sparkles } from 'lucide-react';

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'DoIt.AI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'DoIt.AI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'DoIt.AI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
            <section className='py-16 bg-gradient-to-b from-white to-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                    <div className='inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6'>
                        <Sparkles className='w-4 h-4'/>
                        <span className='text-sm font-medium'>User Testimonials</span>
                    </div>
                    <h2 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
                        Loved by{' '}
                        <span className='relative'>
                            <span className='relative z-10'>Creators</span>
                            <div className='absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full'></div>
                        </span>
                    </h2>
                                    <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                    Don't just take our word for it. Here's what our users are saying about their experience with DoIt.AI.
                </p>
            </div>

            {/* Testimonials Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {dummyTestimonialData.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className='group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-large border border-gray-100 hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-2'
                            style={{animationDelay: `${index * 0.1}s`}}
                        >
                            {/* Quote icon */}
                            <div className='absolute top-6 right-6 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <Quote className='w-6 h-6 text-primary'/>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array(5).fill(0).map((_, starIndex) => (
                                    <div key={starIndex} className='w-5 h-5'>
                                        {starIndex < testimonial.rating ? (
                                            <Star className='w-5 h-5 fill-yellow-400 text-yellow-400'/>
                                        ) : (
                                            <Star className='w-5 h-5 text-gray-300'/>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Content */}
                            <blockquote className='text-gray-700 text-base leading-relaxed mb-6 italic'>
                                "{testimonial.content}"
                            </blockquote>

                            {/* Author */}
                            <div className='flex items-center gap-4 pt-4 border-t border-gray-100'>
                                <div className='relative'>
                                    <img 
                                        src={testimonial.image} 
                                        className='w-14 h-14 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300' 
                                        alt={testimonial.name}
                                    />
                                    <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center'>
                                        <Sparkles className='w-3 h-3 text-white'/>
                                    </div>
                                </div>
                                <div>
                                    <h4 className='font-semibold text-gray-900'>{testimonial.name}</h4>
                                    <p className='text-sm text-gray-600'>{testimonial.title}</p>
                                </div>
                            </div>

                            {/* Hover effect overlay */}
                            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        </div>
                    ))}
                </div>

                            {/* Bottom CTA */}
            <div className='text-center mt-12'>
                    <div className='inline-flex items-center gap-4 text-gray-600'>
                        <div className='flex items-center gap-1'>
                            <Star className='w-5 h-5 fill-yellow-400 text-yellow-400'/>
                            <span className='text-sm font-medium'>4.9/5 Average Rating</span>
                        </div>
                        <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
                        <span className='text-sm font-medium'>1000+ Happy Users</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonial;