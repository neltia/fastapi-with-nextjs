import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark"> {/* 기본적으로 다크 모드 활성화 */}
      <Head />
      <body className="bg-gray-900 text-gray-100"> {/* 다크 모드 기본 스타일 */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
