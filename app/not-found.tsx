/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import "@/styles/globals.css";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>

          <div className="not-found__image-wrapper">
            <img
              src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
              alt="Animated caveman pulling wire"
              width={520}
              height={320}
              className="not-found__image"
            />
          </div>

          <h2 className="not-found__subtitle">Looks like you’re lost</h2>
          <p className="not-found__text">
            The page you’re looking for isn’t available or may have been moved.
          </p>

          <div className="not-found__actions">
            <Link href="/" className="not-found__btn not-found__btn--primary">
              Go to Home
            </Link>
          </div>

          <p className="not-found__footer">
            © {new Date().getFullYear()} HBC Engineering · All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
