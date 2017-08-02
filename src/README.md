# 리액트 앱을 작성하는 곳
리액트 애플리케이션을 작성한다.

### 디렉토리 구조
- src/actions : 액션이다. 서버의 server/routes 의 파일과 1대1 매칭으로 만드는게 좋다
    - src/actions/ActionTypes : 모든 요청에 대한 응답을 정의해 놓은 곳(요청/성공/실패) index.js 느낌이라고 생각하면 된다.
    - src/actions/나머지 : component 또는 container (어차피 둘다 같은 컴포넌트 인데 역할에 따라 분리) 에서 서버로 api 요청을 넣을 때 쓸 기능을 미리 정의해두는 곳이다.
    - 여기서 만들어서 각 component 또는 container 에서 임포트해서 쓴다.
- src/components : 화면에 들어가는 카드, 입력 폼, 모달 등(ex. header, footer, login...etc) 내부적으로 쓰이는 작은 컴포넌트 들이다.
    - src/components/index.js : 컴포넌트를 만들고 여기에 이거 쓸거다 라고 정의해주지 않으면 에러난다. 컴포넌트들이 있고, 컴포넌트들의 목록을 적어 둔 것이니 빠짐 없이 적자
    - 위의 규칙을 안지키면 minified error #130 이 생겨났다. 맨날 뭔지 몰랐는데 여기에 당하지 말자
- src/containers : 하나의 화면 컴포넌트들이다. container 안에 component 들 몇개 넣으면 화면 하나가 된다고 생각하자.
    - src/containers/index.js : 어떤 화면을 쓸것인지 목록
    - src/containers/App.js : 모든 container는 여기를 통한다. App.js 내의 this.props.children 에 들어간다. 기본은 헤더와 푸터와 함께 있는 구조
    - src/containers/나머지 : 이것저것 components 들의 집합이라고 보면 무방하다.
- src/reducers : src/actions/ActionTypes 에서 정의 해둔 응답에 따라서 리액트의 데이터를 업데이트 하는 부분을 정의한다.
    - src/reducers/index.js : 목록
    - src/reducers/나머지 : src/actions/ 의 파일에 1대1로 매칭해서 만든다. 헷갈려서 그런거 같다. 미리 초기화 데이터를 정의해서 내보낼 수도 있다.
- src/index.js : 리앧트 앱 전체적인 설정을 정의한다. 라우팅과 브라우저 히스토리, redux를 위한 연결을 전체적으로 정의한다. /api/ 를 제외한 모든 url에 따라서 App.js에 어떤 container를 연결해줄지, api 요청을 통해서 데이터가 바뀌었을 때, 사용되는 reducers 미리 정의도 해둔다.
- src/style.css : 리액트 앱 어디서든지 사용할 수 있는 스타일 시트 파일



### 리액트 구조
지금까지의 MVC 패턴의 레일즈는
Controller - View (1대1) 구조에 Model의 역할이 강한 것 이었다면, (우리가 배운 부분 까지는, 그래서 사실 만들기 나름) 
리액트는 View -> Action -> Controller -> redux -> View 의 구조다
사용자는 뷰에서 무엇인가 행동을 하고(Action)
행동은 api서버(controller)요청으로 데이터가 변화한다. (redux)
reducer가 변화를 감지해서 view로 전달, 업데이트를한다.

어떻게 보면 레일즈에서도 api서버를 만들고 내부적으로 누르면 ajax로 통신해서 만들 수는 있다.
하지만, 리액트는 state와 props라는 것이 변화하면 자동적으로 업데이트 여부를 검사해서 자동 업데이트를한다.
리액트가 단방향 통신(실시간 데이터 변화 감지 ex. SNS )을 더 강력하게 알아서 한다.


### 리액트의 특징
리액트는 각각 객체가 컴포넌트로 이루어져있다. 이렇게 말하면 뭔소린지 모르겠지만
    
    # 요렇게 생긴거를 만든다는 말 컨테이너도 다 이거다.
    <Component />
    
    
    # 요렇게 생긴 컴포넌트는 props 라는것을 만들어 쓸 수 있다.
    <Component name="geusan" type="linux" value="react" />
    
    # props를 입력해주면 해당 컴포넌트 내부에서 가져다 쓸 수 있다.
    this.props.name => "geusan"
    this.props.type => "linux"
    this.props.value => "react"
    
    
    # container 에서 카드나 표 같은걸 반복적으로 생성할 때, 유용하게 쓸 수 있다.
    # 사용예시1 - 하드 코오딩
    <table>
        <thead>
            <tr>
                <td>name</td>
                <td>type</td>
                <td>value</td>
            </tr>
        </thead>
        <tbody>
            <MyTr name="규산" type="괴식" value="콜라밥" />
            <MyTr name="상은" type="괴식" value="간장아이스크림" />
            <MyTr name="찬연" type="괴식" value="상추튀김" />
        </tbody>
    </table>
    
    # 사용예시2 - jsonArray 인 arr을 이용
    const tableTds = arr.map((data, index) => 
            <MyTr name={data.name} type={data.type} value={date.value} />
        );
        
    <table>
        <thead>
            <tr>
                <td>name</td>
                <td>type</td>
                <td>value</td>
            </tr>
        </thead>
        <tbody>
            {tableTds}
        </tbody>
    </table>
    
    
    # 그리고 컴포넌트에는 state라는 것도 있다.
    
    this.state = {
        title: "haha",
        content: "hoho"
    }
    
    # 이렇게 constructor 에서 정의해두면
    
    this.state.title => "haha"
    this.state.content => "hoho"
    this.setState({
        title: "hihi"
    });
    this.state.title => "hihi"
    
    # 요로케 쓸 수 있다.
    
    # 둘의 차이는 내부적으로 변하는 걸 감지할 때, 외부에서 데이터를 받을 때 나눠서 사용한다고 생각하면 좋다.
    
    
    # state는 상위 컴포넌트에서 값으로 전달 할 수 없고, props 는 전달 할 수 있다는 특징이 있고,
    # 컴포넌트들이 업데이트 될 때도 차이가 난다. (아래의 LifeCycle을 참고하자)
    
    
    # 요렇게 생긴 놈은 자동적으로 발현되는 것들을 가진다. 생성/업데이트/파괴 시에
    # 순서대로 자동으로 발현된다. (LifeCycle)
    
    *생성시
    1. constructor(props) : 생성자
    2. componentWillMount() : 컴포넌트가 DOM 위에 올라오기전에 실행
    3. render() : 컴포넌트가 DOM 위에 렌더링
    4. componentDidMount() : 컴포넌트가 DOM 위에 올라온 후에 실행
    
    *업데이트시
    1. componentWillReceiveProps(nextProps) : 컴포넌트의 props를 새로 받을 때 실행, 여기서 state를 변화시켜도 렌더링은 안함(state는 여기 생략)
    2. shouldComponentUpdate(nextProps, nextState) : props 또는 state가 변화 했을 때, 렌더링을 할지 결정함,  return false 이면 업데이트 취소한다. 
                                                    (return nextProps.id !== this.props.id props와 state가 바뀌기 전의 상황임) 
    3. componentWillUpdate(nextProps, nextState) : 컴포넌트가 업데이트 되기전에 실행
    4. render(): 컴포넌트 업데이트 렌더링
    5. componentDidUpdate(prevProps, prevState) : 컴포넌트가 업데이트 된 후에 실행
    
    *파괴시
    1. componentWillUnmount() : 컴포넌트가 DOM에서 사라진 후에 실행
    

리액트의 전반적인 구조는 설명이 끝났다.
