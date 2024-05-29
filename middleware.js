import {NextResponse} from "next/server";
export function middleware(request){
    const loginToken=request.cookies.get("loginEduEcho")?.value;

    if(request.nextUrl.pathname === "/api/login" ||
        request.nextUrl.pathname === "/api/users" ||
        request.nextUrl.pathname === "/api/users/checkuser" ||
        request.nextUrl.pathname === '/api/current' ||
        request.nextUrl.pathname === '/api/mailer' ||
        request.nextUrl.pathname === '/api/users/forget'){
        return
    }
    const loggedInUserNotAccessPaths = request.nextUrl.pathname ==="/Login" ||  request.nextUrl.pathname === '/Signup' || request.nextUrl.pathname === '/' || request.nextUrl.pathname === '';
    if(loggedInUserNotAccessPaths){
        if(loginToken){
            return  NextResponse.redirect(new URL('/Home',request.url));
        }
    }
    else{
        if(!loginToken){
            if(request.nextUrl.pathname.startsWith("/api")){
                return NextResponse.json({
                    message:"Access Denied!!!",
                    success:false
                },{
                    status:401
                })
            }
            return NextResponse.redirect(new URL('/Login',request.url));
        }
    }
}
export const config={
    matcher:['/','/Login','/Signup','/api/:path*','/Home','/Dashboard','/About',]
}