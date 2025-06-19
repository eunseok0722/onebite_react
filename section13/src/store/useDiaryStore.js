import {create} from "zustand";

// 스토어 정의
const useDiaryStore = create((set, get) => ({
  isLoading: true, // 로딩 상태
  data: [], // 일기 데이터
  idRef: 0, // 일기 데이터의 고유 번호
  nextState: [], // 일기 데이터 생성 후 상태
  initData: (data) => set({data}), // 일기 데이터 초기화
  createDiary: (newData) => {
    const newItem = {
      id: get().idRef,
      createdDate: newData.createdDate.getTime(),
      emotionId: newData.emotionId,
      content: newData.content,
    }
    set((state) => ({data: [newItem, ...state.data]}));
    set({idRef: get().idRef + 1});
    localStorage.setItem("diary", JSON.stringify(get().data));
  }, // 일기 데이터 생성
  updateDiary: (id, createdDate, emotionId, content) => {
    const updatedItem = {
      id: id,
      createdDate: createdDate.getTime(),
      emotionId: emotionId,
      content: content,
    }
    set((state) => ({
      data: state.data.map((item) => (String(item.id) === String(id) ? updatedItem : item)),
    }));
    localStorage.setItem("diary", JSON.stringify(get().data));
  }, // 일기 데이터 수정
  deleteDiary: (targetId) => {
    set((state) => ({data: state.data.filter((item) => String(item.id) !== String(targetId))}));
    localStorage.setItem("diary", JSON.stringify(get().data));
  }, // 일기 데이터 삭제
  setIsLoading: (isLoading) => set({isLoading}), // 로딩 상태 설정
  setIdRef: (idRef) => set({idRef}), // 일기 데이터의 고유 번호 설정
  
}));

export default useDiaryStore;
