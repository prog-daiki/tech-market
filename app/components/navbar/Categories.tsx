'use client';

import { GiSmartphone, } from 'react-icons/gi';
import { LuSmartphoneCharging } from 'react-icons/lu'
import { BiDesktop } from 'react-icons/bi'
import { MdLaptopMac } from 'react-icons/md'
import { FiMonitor } from 'react-icons/fi'
import { BsFillKeyboardFill, BsFillMouseFill, BsSmartwatch, BsHeadphones, BsFillSpeakerFill } from 'react-icons/bs'
import { PiDesktopTowerBold } from 'react-icons/pi'
import { TbDeviceIpad } from 'react-icons/tb'
import { AiFillCamera, AiFillAudio } from 'react-icons/ai'
import { HiSpeakerphone } from 'react-icons/hi'
import Container from "../Container";
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
  {
    label: 'スマートフォン',
    icon: GiSmartphone,
    description: 'スマートフォン',
  },
  {
    label: 'スマホ周辺機器',
    icon: LuSmartphoneCharging,
    description: 'スマートフォンの周辺機器',
  },
  {
    label: 'ノートPC',
    icon: MdLaptopMac,
    description: 'ノートPC',
  },
  {
    label: 'デスクトップPC',
    icon: BiDesktop,
    description: 'デスクトップPC',
  },
  {
    label: 'モニター',
    icon: FiMonitor,
    description: 'モニター',
  },

  {
    label: 'キーボード',
    icon: BsFillKeyboardFill,
    description: 'キーボード',
  },
  {
    label: 'マウス',
    icon: BsFillMouseFill,
    description: 'マウス',
  },
  {
    label: 'PC周辺機器',
    icon: PiDesktopTowerBold,
    description: 'PC周辺機器',
  },
  {
    label: 'スマートウォッチ',
    icon: BsSmartwatch,
    description: 'スマートウォッチ',
  },

  {
    label: 'タブレット',
    icon: TbDeviceIpad,
    description: 'タブレット',
  },
  {
    label: 'カメラ',
    icon: AiFillCamera,
    description: 'カメラ',
  },
  {
    label: 'イヤホン',
    icon: HiSpeakerphone,
    description: 'イヤホン',
  },
  {
    label: 'ヘッドフォン',
    icon: BsHeadphones,
    description: 'ヘッドフォン',
  },
  {
    label: 'スピーカー',
    icon: BsFillSpeakerFill,
    description: 'スピーカー',
  },
  {
    label: 'マイク',
    icon: AiFillAudio,
    description: 'マイク',
  },


]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto w-full">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
