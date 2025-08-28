import { Button, ShadowBox, Txt } from "@/components/atoms";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
    buttonTxt:string,
    phoneNum?:string,
};

export default function ChangeBox({buttonTxt, phoneNum}:Props) {
    const router = useRouter();

    return <div>
        <ShadowBox className="p-4 gap-4">
            <div className="flex items-center pl-4 gap-5">
                {phoneNum ? <Image src="/icons/Ic_Phone_circle_fill.svg" alt="전화기" width={50} height={50}/> : <Image src="/icons/Ic_Lock_circle_fill.svg" alt="락" width={50} height={50}/>}
                <Txt size={24}>{phoneNum || "**************"}</Txt>
            </div>
            <Button title={buttonTxt} color="gray" onClick={() => phoneNum ? router.push('/admin/mypage/contact') : router.push('/admin/mypage/pwd')}/>
        </ShadowBox>
    </div>;
}