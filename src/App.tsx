// import './App.css'
// import RHForm from './RHForm'
// import { zfd } from 'zod-form-data'
// import { Controller } from 'react-hook-form'

// function App() {
//   const schema = zfd.formData({
//     text: zfd.text()
//   })

//   const typingChange = (e: React.ChangeEvent<HTMLTextAreaElement>, max: number) => {
//     if(e.target.value.length > max){
//       e.target.value = e.target.value.slice(0, max)
//     }
//   }

//   function getTextLength(text: string) {
//     // 모든 줄바꿈을 \n으로 통일
//     if(text){
//       const normalized = text.replace(/\r\n|\r/g, '\n');
//       return normalized.length;
//     }
//   }
  

//   return (
//     <div>
//       <h2>FUCKING IOS TEXTAREA TEST</h2>
//       <RHForm schema={schema} onSubmit={() => { }}>
//         <Controller
//           name="text"
//           render={({ field}) => (
//             <>
//             <textarea
//               {...field}
//               style={{ height: '100px', width: '200px' }}
//               maxLength={100}
//               value={field.value}
//               onChange={e => {
//                 field.onChange(e)
//                 typingChange(e, 100)
//               }}/>
//               <p>current typing count : {getTextLength(field.value)}</p>
//               </>
//           )}
//         />
//       <p>maxLength: 100</p>
//       </RHForm>
//     </div>
//   )
// }

// export default App

import './App.css'
import RHForm from './RHForm'
import { zfd } from 'zod-form-data'
import { Controller } from 'react-hook-form'

function normalizeNewlines(text) {
  // 모든 줄바꿈을 \n으로 통일
  return text.replace(/\r\n|\r/g, '\n');
}

// 길이 계산 (줄바꿈 1글자)
function getTextLength(text) {
  if (!text) return 0;
  return normalizeNewlines(text).length;
}

// 실제로 입력을 잘라주는 함수 (줄바꿈 1글자 기준)
function trimToMaxLength(text, max) {
  let count = 0;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    // \r\n을 \n로 처리
    if (text[i] === '\r' && text[i + 1] === '\n') {
      if (count + 1 > max) break;
      result += '\n';
      count += 1;
      i++; // \n도 건너뛰기
    } else if (text[i] === '\r' || text[i] === '\n') {
      if (count + 1 > max) break;
      result += '\n';
      count += 1;
    } else {
      if (count + 1 > max) break;
      result += text[i];
      count += 1;
    }
  }
  return result;
}

function App() {
  const schema = zfd.formData({
    text: zfd.text()
  })

  const MAX = 100;

  return (
    <div>
      <h2>FUCKING IOS TEXTAREA TEST</h2>
      <RHForm schema={schema} onSubmit={() => { }}>
        <Controller
          name="text"
          render={({ field }) => (
            <>
              <textarea
                {...field}
                style={{ height: '100px', width: '200px' }}
                // maxLength={MAX} // ❌ 제거
                value={field.value}
                onChange={e => {
                  // 초과 입력 시 잘라내기
                  const trimmed = trimToMaxLength(e.target.value, MAX);
                  field.onChange(trimmed);
                }}
              />
              <p>current typing count : {getTextLength(field.value)} / {MAX}</p>
            </>
          )}
        />
        <p>maxLength: {MAX}</p>
      </RHForm>
    </div>
  )
}

export default App
