import { Button, ShadowBox } from "@/components/atoms";
import { Header } from "@/components/common";

export default function AdminMyPage() {
// onClick={() => router.push('/admin/stays/add')}
// className = `${}`

  return (
    <div>
      <Header bgColor="pink" title="내 정보" />
      
      <div>
        관리자
      </div>

      <div>
        <ShadowBox>
          <Button title="비밀번호 변경" />
        </ShadowBox>
      </div>

      <div>
        <ShadowBox >
          <Button title="비밀번호 변경" />
        </ShadowBox>
      </div>

      <Button color="pink" title="뒤로가기" onClick={() => router.push('/admin')}/>
    </div>
  );
}
