import RHForm from './RHForm'
import { zfd } from 'zod-form-data'
import { Controller } from 'react-hook-form'

// 일부 버전의 IOS Safari에서 textarea에 줄바꿈을 넣으면 내부적으로는 2글자 처리, 하지만 UI에 나타나는 글자수는 1개로 취급하는 문제 대응 함수
const getTextareaValueWithIOSLineBreakException = (text: string, max: number) => {
  const processChar = (
    remainingText: string,
    currentCount: number,
    accumulatedResult: string
  ) => {
    // 재귀함수 종료 조건
    if (currentCount >= max || remainingText.length === 0) {
      return accumulatedResult;
    }

    const [firstChar, secondChar] = [remainingText[0], remainingText[1]];

    if (firstChar === '\r' && secondChar === '\n') {
      if (currentCount + 1 > max) return accumulatedResult;
      return processChar(
        remainingText.slice(2),
        currentCount + 1,
        accumulatedResult + '\n'
      );
    }

    if (firstChar === '\r' || firstChar === '\n') {
      if (currentCount + 1 > max) return accumulatedResult;
      return processChar(
        remainingText.slice(1),
        currentCount + 1,
        accumulatedResult + '\n'
      );
    }

    if (currentCount + 1 > max) return accumulatedResult;
    return processChar(
      remainingText.slice(1),
      currentCount + 1,
      accumulatedResult + firstChar
    );
  }
  // 초기 호출
  return processChar(text, 0, '');
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
                value={field.value}
                onChange={e => {
                  // 초과 입력 시 잘라내기
                  const refinedText = getTextareaValueWithIOSLineBreakException(e.target.value, MAX);
                  field.onChange(refinedText);
                }}
              />
              <p>current typing count : {(field.value?.length || 0)} / {MAX}</p>
            </>
          )}
        />
      </RHForm>
    </div>
  )
}

export default App
