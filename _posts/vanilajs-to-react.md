---
title: 'Vanila JS로 React 컨셉 따라하기 (feat. Todo List)'
excerpt: '올해 2학기에 CEOS 신촌연합창업동아리에 프론트엔드 개발팀으로 참여하게 되었다..! 1주차 과제는 Vanila JS로 todo list 를 만드는 것이었는데, 이번 기회에 리액트 컨셉을 바닐라 JS로 구현해보기로 했다.'
coverImage: '/assets/blog/vanilajs-to-react/preview.png'
date: '2021-09-21'
ogImage:
    url: '/assets/blog/vanilajs-to-react/preview.png'
---

올해 2학기에 CEOS 신촌연합창업동아리에 프론트엔드 개발팀으로 참여하게 되었다..!

1주차 과제는 Vanila JS로 todo list 를 만드는 것이었는데, 이번 기회에 **리액트 컨셉**을 바닐라 JS로 구현해보기로 했다.

### 들어가며

프론트엔드 개발에 자주 사용되는 **React** 는

1. MVC 패턴의 View 를 위한 페이스북의 오픈 소스 라이브러리이면서
2. **상태를 가지는 Component** 를 기반으로 UI를 구성한다.

컴포넌트가 상태를 가지기 때문에 리액트는 해당 상태가 변경됨에 따라 Virtual DOM을 재조정하게 된다. (prevState과 nextState을 비교하여 달라진 경우에만 Virtual DOM 복사) [참고](https://ko.reactjs.org/docs/faq-internals.html)

<img src="/assets/blog/vanilajs-to-react/reconciliation.png" />

16.8 버전 이전에는 **클래스형 컴포넌트**로 여러 라이프 사이클 메서드들 (componentiDdMount, componentShouldUpdate, componentWillunMount 등) 을 통해 렌더링 로직을 다뤘다면,

16.8 버전부터는 Hook을 도입하여 **함수형 컴포넌트**의 useEffect와 다양한 Cutom Hook을 통해 "**상태 변화를 기준으로 렌더링**"을 하는 데에 집중할 수 있게 됐다.

⇒ **useEffect**의 두 번째 인자에 상태변화를 포착하고자 하는 data를 전달함으로써 해당 data가 변경됐을 때만 특정 로직을 수행한다. (리렌더링 등)

⇒ 다른 **Custom hook**을 subscribe하여 해당 훅의 상태가 변할 때에만 컴포넌트를 리렌더링한다.

### State을 가지는 Component 를 구현해보자

아니 그래서,, 이번 Vanila JS 과제에서 위에서 말한 "상태 변화를 기준으로 컴포넌트 렌더링"에 집중해봤다는 말이다,,

이를 위해 최상위 컴포넌트 한 개를 포함한 **네 개의 컴포넌트**를 만들었고 각각 모듈로 분리를 했다.

먼저 최상위 컴포넌트에서 모든 상태와 이 상태를 바꾸는 함수를 가지고 있고 이를 props로 하위 컴포넌트들에 내려주어서 컴포넌트들끼리 의존성을 만들어주었다.

<img src="/assets/blog/vanilajs-to-react/architecture.png" />

이후 **상태 기준 렌더링**을 위해 아래처럼 state이 바뀌어야 렌더링이 일어날 수 있도록 **render 함수는 setState 함수 내부에서만 호출**하도록 구현했다.

```jsx
// WaitingList.js

function WaitingList({location, initialState, onClickTodoItem, onDeleteTodoItem}) {

    this.state = {...initialState};

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState
        }

        this.render();
    }

    this.render = (waitingTodo) => {
						// Render Logic
    }

    this.render(this.state.waitingTodo);
}

export default WaitingList

// App.js

function App() {


	// ...

	WaitingList = new WaitingList({some parameters})

}
```

### Trouble Shooting

Todo Item 각각에 대해 ID를 줄 때 어떻게 줄까..하다가 그냥 1부터 증가하도록 만들었는데 코드 리뷰로 선종님이 unix timestamp 라는 좋은 방법을 알려주셔서.. 이대로 코드 리팩토링해보도록하자,,
