import {NextRequest, NextResponse} from "next/server";

let locales = ['en', 'pl'];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return 'pl';

  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0]);

  for (let lang of languages) {
    if (locales.includes(lang)) {
      return lang;
    }
  }

  return 'pl';
}

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  const currentUser = request.cookies.get("currentUser")?.value
  const token = request.cookies.get("token")?.value

  // Omit API routes from redirection
  if (pathname.startsWith('/api')) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = getLocale(request);

  if (!currentUser && !token) {
    if (!pathname.startsWith(`/${locale}/login`)) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
    return NextResponse.next();
  }

  if (pathnameHasLocale) {
    return NextResponse.next()
  }


  // Redirect if there is no locale

  request.nextUrl.pathname = `/${locale}${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
