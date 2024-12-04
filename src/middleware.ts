import { NextRequest, NextResponse } from "next/server"

const privatePaths = ["/client", "/admin", "/unauthorized"]
const authPaths = ["/login", "/register"]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value
    const role = request.cookies.get("role")?.value

    if (privatePaths.some((path) => pathname.includes(path))) {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (
        authPaths.some((path) => pathname.includes(path)) &&
        refreshToken &&
        accessToken
    ) {
        return NextResponse.redirect(
            new URL(`/${role?.toLowerCase()}`, request.url)
        )
    }

    if (pathname === "/admin") {
        return NextResponse.redirect(new URL("/admin/user", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|image|favicon.ico).*)"],
}
