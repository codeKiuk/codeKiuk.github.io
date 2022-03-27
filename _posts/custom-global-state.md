---
title: '전역 상태 관리 기능 구현해보기 (feat. only React)'
excerpt: 'Custom Hook을 통해 의존성 분리를 통해 가독성을 높인 후 구글 lighthouse를 통해 사이트 성능을 측정해보았다. 모바일의 경우 데스크탑보다 성능이 떨어지기 때문에 퍼포먼스 테스트에서 낮은 점수를 보여주는 것 같다. 처음 테스트 후 여러 번 프로파일링을 해봤는데 50점대를 기어다녀서 이 기회에 성능 개선을 하기로 했다. lighthouse에서는 아래와 같이 친절히 진단해준다.'
coverImage: '/assets/blog/custom-global-state/preview.png'
date: '2021-09-28'
ogImage:
    url: '/assets/blog/custom-global-state/preview.png'
---

### 링크

[React-Todo](https://react-todo-14th-o58e65h1y-codekiuk.vercel.app)

### 들어가며

앞서 바닐라 JS 과제에서는 전역 상태 관리 기능을 구현하지 않아서 부모 컴포넌트에 자식 컴포넌트들 간 의존하고 있는 state을 두어 이를 자식들에게 props로 넘겨주는 전통적인 React의 **State 끌어올리기** 방식을 사용했다. [참고 - State 끌어올리기](https://ko.reactjs.org/docs/lifting-state-up.html)

따라서 이번에 React로 todo list 를 구현할 때에는 **전역 상태 관리 기능 구현**에 집중해보기로 했다.

### 신경 쓴 포인트

-   **디렉토리 구조 :**

이전까지는

    -components
    -redux
    -pages
    -hooks

지금까지는 이런 식으로 개발자의 입장에서 **코드의 역할, 계층**을 기준으로 패키지 구조를 가져갔다면,

이번에는 아래와 같이 어플리케이션의 각 기능을 기준으로 패키기 구조를 가져가보기로 했다.

    -@shared (어플리케이션 공통으로 쓰이는 것들)
    -components
    -hooks
    -api
    -todo-list
    -components
    -hooks
    -api
    -login
    -components
    -hooks
    -api
    -logout
    -user
    ...

이렇게 하면 코드를 수정할 때 디렉토리를 여러 군데 옮겨 다니면서 작업하지 않아도 되는 장점이 있다!

기존의 코드 역할 기준 패키지 구조는 특정 기능을 리팩토링할 때 여러 디렉토리를 거쳐가며 수정해야 했기에 번거로웠다.

⇒ todo list 기능을 위한 코드가 components, redux, hooks 등 여러 디렉토리에 나뉘어 있기 때문..

[패키지 구조 관련 참고 글](https://ahnheejong.name/articles/package-structure-with-the-principal-of-locality-in-mind/)

사실 장단점을 느낄 수도 없을 만큼 작은 프로그램이라 그냥 패키지 만들어 보는 연습 삼아 해봤다,,,

-   **전역 상태 관리 :**
    React 에서 제공하는 Custom Hook과 JS의 Class 기능을 사용했다.
    전역 상태 관리용 store 객체는

    1. 상태 가져오기 (getState)
    2. 상태 변경하기 (setState)
    3. 변경된 상태에 반응하여 업데이트하기
       기능이 필요하다.
       아래는 Custom Atom 구현 내용이다.

    ```tsx
    class waitingTodosAtom {
        constructor() {
            this.state = []
            this.setters = []
        }

        getState() {
            return this.state
        }

        setState(nextState) {
            this.state = nextState
            this.setters.forEach((setter) => setter(this.state))
        }

        update(setter) {
            if (this.setters.includes(setter)) {
                return
            }

            this.setters.push(setter)

            // cleaner
            return () => {
                const idx = this.setters.findIndex(setter)
                this.setters.splice(idx, 1)
            }
        }
    }
    ```

    원래 목표했던 바는 아래와 같다.

<aside>
📎 전역 상태를 가지는 atom 객체(store) 에서 상태를 가져오는 getter 함수와 상태를 업데이트하는 setter 함수를 Custom Hook을 통해 Presenter 컴포넌트가 사용하도록 해보자.

</aside>

### 그러나...

급하게 구현하려고 하기도 했고, 변경된 상태에 반응하여 업데이트하는 부분에서 에러가 많이 나왔다.

처음에 atom 객체를 일반 객체로 만들었다가, 함수로 만들어서 객체를 리턴했다가,

```tsx
new Function()
```

으로도 만들어봤는데 결국 클래스로 구현했다.. 역시 클래스가 '구현'에 있어서는 정말.. 좋은 것 같다.

어쨌거나 성공한 줄 알았는데 몇 번 테스트 해보니 대기리스트와 완료리스트 간 아이템 삭제 및 status 변경에서 계속 오류가 난다,, ㅜㅜ

자료구조 수업때부터 느꼈지만 구현은 정말 어려운 것 같다 ㅠ~~~ 주말에 더 수정해봐야겠다.

<s>그냥 context api 쓸 걸 ...</s>

### **문제 해결**

오류 수정 전에 Atom 코드에서 custom hook의 상태를 리턴을 해줬는데,

**Custom Hook 의 상태는 해당 훅을 구독하는 컴포넌트끼리 공유되지 않기 때문**에 오류가 났었다.

그래서 전역 상태를 가지는 Atom의 state을 반환시켜줬더니,, 잘 돌아간다..ㅎ...

(혹은 React에서 기본적으로 제공하는 hook인 useRef 를 통해 상태를 공유할 수 있다. useRef로 저장한 값은 물론 변할 때마다 리렌더를 유도하지는 않지만,,)

### Why Atoms ?

Recoil과 React의 Context API 의 차이점을 잘 설명해준 링크다!

Context의 경우 Context의 모든 컨슈머 컴포넌트가 리렌더링되는 반면 Recoil의 경우 atomFamily라는 함수를 통해 독립적인 값을 가질 수 있는 컨슈머 컴포넌트들을 분리할 수 있다.

(**동적으로** atom을 만들 수 있다!)

<img src="/assets/blog/custom-global-state/atom.png" />

vs [Context API](https://ui.toast.com/weekly-pick/ko_20200616#context-api를-사용하는-것은-어떨까)
