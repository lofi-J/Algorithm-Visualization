import { ThemeProvider, createGlobalStyle } from "styled-components";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Infomation from "./pages/Infomation";
import Home from "./pages/Home"
import { useRecoilValue } from "recoil";
import { isDark, isModalOpen } from "./state-management/atom";
import { darkMode, lightMode } from "./style/theme";
import Background from "./components/Background";



const GlobalStyle = createGlobalStyle`
  
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
h1 {
  font-size: 30px;
}
h2 {
  font-size: 28px;
}
h3 {
  font-size: 22px;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
body {
  font-family: "Noto Serif", serif;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.color};
}
a {
  text-decoration: none;
  color: ${props => props.theme.color};
}
`

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/infomation',
    element: <Infomation />
  },
])

function App() {
  const isDarkTheme = useRecoilValue(isDark);
  const isModalOpen_ = useRecoilValue(isModalOpen);
  return (
    <>
      <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
        <GlobalStyle />
        {isModalOpen_ ? null : <Background />}
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );                
}
export default App;