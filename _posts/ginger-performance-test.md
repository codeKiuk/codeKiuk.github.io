---
title: '가볍게 사이트 성능 측정 및 개선'
excerpt: 'Custom Hook을 통해 의존성 분리를 통해 가독성을 높인 후 구글 lighthouse를 통해 사이트 성능을 측정해보았다. 모바일의 경우 데스크탑보다 성능이 떨어지기 때문에 퍼포먼스 테스트에서 낮은 점수를 보여주는 것 같다. 처음 테스트 후 여러 번 프로파일링을 해봤는데 50점대를 기어다녀서 이 기회에 성능 개선을 하기로 했다. lighthouse에서는 아래와 같이 친절히 진단해준다.'
coverImage: '/assets/blog/ginger-performance-test/preview.png'
date: '2021-09-01'
ogImage:
    url: '/assets/blog/ginger-performance-test/opportunity.png'
---

### 들어가며

![모바일 테스트](/assets/blog/ginger-performance-test/mobile-test-before.png)

모바일 테스트

![데스크탑 테스트](/assets/blog/ginger-performance-test/desktop-test-before.png)

데스크탑 테스트

Custom Hook을 통해 의존성 분리를 통해 가독성을 높인 후 구글 lighthouse를 통해 사이트 성능을 측정해보았다.

모바일의 경우 데스크탑보다 성능이 떨어지기 때문에 퍼포먼스 테스트에서 낮은 점수를 보여주는 것 같다.

처음 테스트 후 여러 번 프로파일링을 해봤는데 50점대를 기어다녀서 이 기회에 성능 개선을 하기로 했다.

lighthouse에서는 아래와 같이 친절히 진단해준다.

![스크린샷 2021-09-07 오후 2.18.48.png](/assets/blog/ginger-performance-test/opportunity.png)

> **Opportunity**

HTTP/2를 사용하라는 것을 제외하면 (도메인이 없어 https가 아니라 HTTP/1.1로만 요청한다,,ㅎ,) JS 크기를 줄이고 텍스트를 압축해서 req/res하라는 등 리소스를 줄이는 것이 좋다고 하는 것 같다.

최상위 App.tsx에서 Route별로 lazy loading을 통해 코드 스플리팅을 했는데도 50점대라.. 추가적으로 스플리팅할 수 있는 부분을 찾아보도록 하자.

먼저 코드 스플리팅은 일반적으로 다음과 같은 경우에 적용할 수 있다.

1. Route 레벨
2. Component 레벨 (모달, form 등)
3. 하나의 페이지가 너무 많은 컴포넌트를 가지고 있을 경우 해당 페이지를 스플리팅

컴포넌트 레벨에서 스플리팅을 해보자.

코드 스플리팅 적용 후 빌드를 하니 스플리팅 이전보다 빌드 결과로 나온 js 파일의 수가 많아졌다!

![스크린샷 2021-09-07 오후 5.14.14.png](/assets/blog/ginger-performance-test/code-splitting.png)

> **결과**

모바일 환경에서 83점을 기록한 것으로 코드스플리팅의 효과가 없지는 않은 걸로...

But.. 앱 자체 크기도 크지 않고 텍스트 데이터만 crud 하는 게 전부인지라 성능 개선이 크게 의미있지는 않았던 것 같다. 애초에 단순 기능만 들어있으니,,

또한 실제로 속도면에서 사람이 체감할 정도로 좋아진 건 아니라 점수가 많이 올라도 정말 좋아진 건가? 하는 의문이 들긴 한다..

그래도 실제로 코드 스플리팅을 해보고 빌드 결과가 달라지는 것도 보고.. 경험하는 것은 언제나 좋으니 좋게 좋게 생각해보도록 하자 ^0^

추가적으로 이 플젝에서 해볼 수 있는 최적화 작업은

1. **도메인적용해서 https로 바꾸기 ^.^....**
2. s3 등 정적 리소스용 DB를 파서 js 파일 실행없이 마크업을 바로 보여주도록 한다 (FCP)
3. 웹폰트 최적화

정도가 있을 것 같다.

![스크린샷 2021-09-07 오후 9.25.22.png](/assets/blog/ginger-performance-test/mobile-test-after.png)

> **Error Handling**

Cannot update { Pagination } while rendering { withPaperContainer } 오류가 나서 찾아보니 hoc인 withPaperContainer를 렌더하는 중에 Pagination 컴포넌트가 업데이트되지 않아 발생한 것이었다.

확인해보니 pagination 로직이 hoc 안에도 있고 Pagination 컴포넌트 안에도 있어서 다음 페이지를 눌렀는데도 다음 숫자로 렌더되지 않고 리스트만 다음 페이지 리스트로 업데이트되는 에러가 났었다. (hoc 렌더 중 side effect 발생)

이를 해결하기 위해,

1. withPaperContainer HOC에서 Pagination 컴포넌트 렌더링 기능을 제거하고 Main과 MyContent에서 Pagination 컴포넌트가 각자 렌더링을 담당하도록 만들고 (+ custom hook으로 pagination 로직 공유)
2. Pagination 컴포넌트에서 페이지네이션 로직 제거 → usePagination, useFetchPage 훅에 옮기
3. 기존에는 HOC에서 render할 때마다 setTotalDocs했는데 useEffect로 contentCount 바뀌었을 때만 setTotalDocs 액션을 dispatch 했다.

결국 hoc에서 페이징 로직을 빼고 페이징에 따라 글을 렌더하는 기능 하나만 남길 수 있었다!
