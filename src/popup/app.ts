export default (window: Window) => {
  const document = window.document
  const submit1: HTMLElement = document.querySelector('.submit1')

  submit1.onclick = () => {
  }

  // アイコンを押して表示した時に毎回発火。なので毎回storageからデータを取得してUIを更新している
  window.onload = async (e) => {}
}
