import { BLOG_OWNER, BLOG_OWNER_ID } from '../lib/constants'

const Intro = () => {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
                {BLOG_OWNER}
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
                Blog with some dev things and others..
            </h4>
        </section>
    )
}

export default Intro