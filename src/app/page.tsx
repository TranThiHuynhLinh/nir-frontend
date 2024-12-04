import { SpinningBlock } from "@/components/decorations/spinning-block"
import { AppNavbar } from "@/components/layouts/home-navbar"
import { Cover } from "@/components/ui/cover"
import Link from "next/link"

export default function Page() {
    return (
        <div className="h-full flex flex-col justify-center items-center grid-bg">
            <AppNavbar />
            <div id="home"></div>
            <Home />
            <div className="h-[1000px]" id="features"></div>
            <div className="h-[1000px]" id="contact"></div>
        </div>
    )
}

const Home = () => {
    return (
        <div className="w-[70%] flex flex-col items-center">
            <div className="w-full text-6xl text-center mt-40">
                Analyze and classify chemical components with <br />
                <Cover>your spectral data</Cover>
            </div>
            <Link href="/client" className="home__btn my-8">
                <strong>Start your first Analysis</strong>
                <div id="container-stars">
                    <div id="stars"></div>
                </div>
                <div id="glow">
                    <div className="home__circle"></div>
                    <div className="home__circle"></div>
                </div>
            </Link>
            <SpinningBlock className="mt-8" />
        </div>
    )
}
