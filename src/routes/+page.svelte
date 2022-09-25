<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Footer from "../lib/Footer.svelte";
    import Container from "$lib/Container.svelte";
    import Grid from "$lib/Grid.svelte";
    import Region from "$lib/Region.svelte";
    import FullImage from "$lib/FullImage.svelte";

    import memo from "$svg/memo.svg?url";
    import speaker from "$svg/speaker.svg?url";
    import trophy from "$svg/trophy.svg?url";
    import books from "$svg/books.svg?url";
    import internet from "$svg/internet.svg?url";
    import computer from "$svg/computer.svg?url";
    import television from "$svg/television.svg?url";
    import time from "$svg/time.svg?url";
</script>

<style lang="scss">
  :global {
    @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

    body, html, body > div {
      margin: 0;
      padding: 0;
      font-family: 'Spoqa Han Sans Neo', 'sans-serif';
      height: 100%;
    }

    body {
      background: #fafafe;
    }

    $primary: #6b67c7;
    $secondary: #00ff00;
    $surface: #eceef3;
    $on-primary: #ffffff;
    $on-surface: #000000;

    :root {
      --mt-primary: #{$primary};
      --mt-secondary: #{$secondary};
      --mt-surface: #{$surface};
      --mt-on-primary: #{$on-primary};
      --mt-on-surface: #{$on-surface};


      --mc-ripple-color: #000000;
      --mc-ripple-duration: 0.3s;
    }
  }

  .mainLogo {
    width: 600px;
    max-width: 90vw;
  }

  main {
    width: 100%;
    height: 100%;
  }

  * {
    color: #1b1b2a;
  }

  h1 {
    font-size: 48px;
    margin: 5px 0;
  }

  h2 {
    font-size: 32px;
    margin: 5px 0;
  }

  h3 {
    font-size: 28px;
    font-weight: 400;
    margin: 5px 0;
  }

  h4 {
    margin: 5px 0;
    font-weight: 300;
  }

  .gradient {
    background: -webkit-linear-gradient(30deg, #C41162 0%, #0CA4DD 20%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .icon {
    position: relative;
    top: 4px;
    height: 30px;
  }
</style>

<Header/>
<main>
    <Container full>
        <div style="height: calc(10px + 10vw);"></div>
        <h1 class="gradient">VLAB</h1>
        <h3>카포전을 준비하는 동아리입니다.</h3>
        <h2 style="margin: 20px 0;">
            <img src={speaker} alt="공지" class="icon">
            소식
        </h2>
        <Grid max="2" width="350">
            <Region img="/recruit.png">
                <h2 style="font-size: 30px;">
                    <img src={memo} alt="공지" class="icon">
                    VLAB 리크루팅
                </h2>
                <h4 style="color: #555;font-size: 18px;">VLAB에서 가을 리크루팅을 진행합니다.<br>클릭해서 자세한 정보를 살펴보세요.</h4>
            </Region>
            <Region img="/win.jpeg">
                <h2 style="font-size: 30px;">
                    <img src={trophy} alt="공지" class="icon">
                    2022 카포전 승리
                </h2>
                <h4 style="color: #555;font-size: 18px;">2022 카포전에서 과학퀴즈, AI전에서 모두 승리했습니다.<br>여러분들의 응원 덕분입니다. 감사합니다.
                </h4>
            </Region>
        </Grid>
    </Container>
    <div style="height: calc(40px + 10vw);"></div>
    <Container full>
        <FullImage src="/quiz.png">
            <h2>과학퀴즈팀</h2>
            <h4>모든 문제를 맞춥니다.</h4>
        </FullImage>
        <Grid max="2" width="350">
            <Region img="/wiki.jpeg">
                <h2 style="font-size: 30px;">
                    <img src={books} alt="공지" class="icon">
                    연습
                </h2>
                <h4 style="color: #555;font-size: 18px;">같이 모여서 열심히 연습합니다.</h4>
            </Region>
            <Region img="/library.jpg">
                <h2 style="font-size: 30px;">
                    <img src={internet} alt="공지" class="icon">
                    위키 작성
                </h2>
                <h4 style="color: #555;font-size: 18px;">과거 기출, 정보들을 저장하는 위키를 제작합니다.</h4>
            </Region>
        </Grid>
    </Container>
    <Container full>
        <FullImage src="/ai.png">
            <h2>인공지능팀</h2>
            <h4>정말 멋진 에이전트를 만듭니다.</h4>
        </FullImage>
        <Grid max="2" width="350">
            <Region img="/coding.png">
                <h2 style="font-size: 30px;">
                    <img src={computer} alt="공지" class="icon">
                    코딩
                </h2>
                <h4 style="color: #555;font-size: 18px;">직접 인공지능을 만듭니다.<br>NN부터 휴리스틱까지 모두다요!</h4>
            </Region>
            <Region img="/seminar.jpeg">
                <h2 style="font-size: 30px;">
                    <img src={television} alt="공지" class="icon">
                    세미나
                </h2>
                <h4 style="color: #555;font-size: 18px;">학습 자료를 만들어 같이 공부합니다.<br>CS101만 들으면 이해될 정도로 쉽게요.</h4>
            </Region>
        </Grid>
    </Container>
    <Container>
        <h2 style="margin: 20px 0;">
            <img src={time} alt="공지" class="icon">
            연혁
        </h2>
        <ul>
            <li>2022.09 카포전 우승</li>
            <li>2022.04 VLAB 설립</li>
        </ul>
    </Container>
    <Footer/>
</main>

<svelte:head>
    <title>VLAB</title>
</svelte:head>
