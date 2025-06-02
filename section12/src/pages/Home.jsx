import { useSearchParams } from "react-router-dom";

const Home = () => {
    // 쿼리 파라미터 사용하는 방법
    const [params, setParams] = useSearchParams();

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;