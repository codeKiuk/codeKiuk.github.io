import { BLOG_OWNER_ID } from '../lib/constants'
const ProfileImg = '/assets/blog/authors/FIRE.jpeg'

const Avatar = () => {
    return (
        <div className="flex items-center">
            <img src={ProfileImg} className="w-12 h-12 rounded-full mr-4" />
            <div className="text-xl font-bold">{BLOG_OWNER_ID}</div>
        </div>
    )
}

export default Avatar
