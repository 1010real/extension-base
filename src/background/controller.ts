export default () => {
  chrome.runtime.onInstalled.addListener(({}) => {
    chrome.tabs.create({ url: 'https://smartshopping.co.jp/' })
  })

  const handleActionClick = async () => {}
  chrome.action.onClicked.addListener(handleActionClick)

  const handleMessage = async (request:any) => {
    switch (request.action) {
      case 'action1':
        return { data: 'response for action1' }
    }
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('onMessage', request.action)
    handleMessage(request).then((value) => sendResponse(value))
    return true
  })

  chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {})
}
