import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
        // $ DOM요소가 저장되는다는 뜻에서 앞에 관례상 붙이게 됨
        const $title = document.getElementsByTagName("title")[0];
        $title.innerText = title;
    }, []);
}

export default usePageTitle;