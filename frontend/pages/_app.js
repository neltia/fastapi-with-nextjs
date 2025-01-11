import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // 메인 검색 페이지("/")는 네비게이션 바 제외
  const excludeNavBarRoutes = ["/"];

  return (
    <div>
      {!excludeNavBarRoutes.includes(router.pathname) && <NavBar />}
      <Component {...pageProps} />
    </div>
  );
}
