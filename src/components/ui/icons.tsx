import { forwardRef, type SVGProps } from 'react'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import {
  ActivityIcon as ActivityData,
  AlertCircleIcon as AlertCircleData,
  AlertTriangle as AlertTriangleData,
  ArrowDownRightIcon as ArrowDownRightData,
  ArrowLeftIcon as ArrowLeftData,
  ArrowRightIcon as ArrowRightData,
  ArrowDataTransferHorizontalIcon as ArrowRightLeftData,
  ArrowUpRightIcon as ArrowUpRightData,
  AwardIcon as AwardData,
  BadgeCheckIcon as BadgeCheckData,
  BarChartIcon as BarChart2Data,
  ChartBarLineIcon as BarChart3Data,
  BellIcon as BellData,
  BookOpenIcon as BookOpenData,
  BookmarkIcon as BookmarkData,
  BookmarkPlusIcon as BookmarkPlusData,
  BotIcon as BotData,
  BrainCircuitIcon as BrainCircuitData,
  BriefcaseIcon as BriefcaseData,
  Building02Icon as Building2Data,
  CalendarIcon as CalendarData,
  CheckIcon as CheckData,
  CheckCheckIcon as CheckCheckData,
  CheckCircle as CheckCircleData,
  ChevronDownIcon as ChevronDownData,
  ChevronRightIcon as ChevronRightData,
  ClockIcon as ClockData,
  CodeIcon as CodeData,
  CompassIcon as CompassData,
  CpuIcon as CpuData,
  CreditCardIcon as CreditCardData,
  DollarSignIcon as DollarSignData,
  DownloadIcon as DownloadData,
  PencilEdit01Icon as Edit2Data,
  ExternalLinkIcon as ExternalLinkData,
  EyeIcon as EyeData,
  EyeOffIcon as EyeOffData,
  FileTextIcon as FileTextData,
  FilterIcon as FilterData,
  GlobeIcon as GlobeData,
  GraduationCapIcon as GraduationCapData,
  HeartIcon as HeartData,
  HelpCircleIcon as HelpCircleData,
  HomeIcon as HomeData,
  ImageIcon as ImageData,
  InfoIcon as InfoData,
  SquareKanbanIcon as KanbanSquareData,
  KeyIcon as KeyData,
  LayersIcon as LayersData,
  LightbulbIcon as LightbulbData,
  Link2 as Link2Data,
  LockIcon as LockData,
  LogOutIcon as LogOutData,
  MailIcon as MailData,
  MapPinIcon as MapPinData,
  MessageCircleIcon as MessageCircleData,
  MessageSquareIcon as MessageSquareData,
  MicIcon as MicData,
  MonitorIcon as MonitorData,
  MoonIcon as MoonData,
  MoreHorizontalIcon as MoreHorizontalData,
  PackageIcon as PackageData,
  PaletteIcon as PaletteData,
  PaperclipIcon as PaperclipData,
  PhoneIcon as PhoneData,
  PlayIcon as PlayData,
  PlusIcon as PlusData,
  QrCodeIcon as QrCodeData,
  RefreshCwIcon as RefreshCwData,
  RotateCcwIcon as RotateCcwData,
  ScaleIcon as ScaleData,
  SearchIcon as SearchData,
  SendIcon as SendData,
  SettingsIcon as SettingsData,
  Share2 as Share2Data,
  ShieldIcon as ShieldData,
  ShieldCheckIcon as ShieldCheckData,
  ShoppingBagIcon as ShoppingBagData,
  SlidersHorizontalIcon as SlidersHorizontalData,
  SmartphoneIcon as SmartphoneData,
  SmileIcon as SmileData,
  SparklesIcon as SparklesData,
  StarIcon as StarData,
  StoreIcon as StoreData,
  SunIcon as SunData,
  TagIcon as TagData,
  TargetIcon as TargetData,
  Trash2 as Trash2Data,
  TrendingUpIcon as TrendingUpData,
  UploadIcon as UploadData,
  UserIcon as UserData,
  UserCheckIcon as UserCheckData,
  UsersIcon as UsersData,
  VideoIcon as VideoData,
  XIcon as XData,
  XCircle as XCircleData,
  ZapIcon as ZapData,
} from '@hugeicons/core-free-icons'

export type IconComponent = ReturnType<typeof createProfileIcon>
export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number
  strokeWidth?: number
}

function createProfileIcon(icon: IconSvgElement) {
  return forwardRef<SVGSVGElement, IconProps>(function ProfileIcon(
    { size = 24, strokeWidth = 1.7, color = 'currentColor', ...props },
    ref,
  ) {
    return (
      <HugeiconsIcon
        ref={ref}
        icon={icon}
        size={size}
        strokeWidth={strokeWidth}
        color={color}
        {...props}
      />
    )
  })
}

export const Activity = createProfileIcon(ActivityData)
export const AlertCircle = createProfileIcon(AlertCircleData)
export const AlertTriangle = createProfileIcon(AlertTriangleData)
export const ArrowDownRight = createProfileIcon(ArrowDownRightData)
export const ArrowLeft = createProfileIcon(ArrowLeftData)
export const ArrowRight = createProfileIcon(ArrowRightData)
export const ArrowRightLeft = createProfileIcon(ArrowRightLeftData)
export const ArrowUpRight = createProfileIcon(ArrowUpRightData)
export const Award = createProfileIcon(AwardData)
export const BadgeCheck = createProfileIcon(BadgeCheckData)
export const BarChart2 = createProfileIcon(BarChart2Data)
export const BarChart3 = createProfileIcon(BarChart3Data)
export const Bell = createProfileIcon(BellData)
export const BookOpen = createProfileIcon(BookOpenData)
export const Bookmark = createProfileIcon(BookmarkData)
export const BookmarkPlus = createProfileIcon(BookmarkPlusData)
export const Bot = createProfileIcon(BotData)
export const BrainCircuit = createProfileIcon(BrainCircuitData)
export const Briefcase = createProfileIcon(BriefcaseData)
export const Building2 = createProfileIcon(Building2Data)
export const Calendar = createProfileIcon(CalendarData)
export const Check = createProfileIcon(CheckData)
export const CheckCheck = createProfileIcon(CheckCheckData)
export const CheckCircle = createProfileIcon(CheckCircleData)
export const ChevronDown = createProfileIcon(ChevronDownData)
export const ChevronRight = createProfileIcon(ChevronRightData)
export const Clock = createProfileIcon(ClockData)
export const Code = createProfileIcon(CodeData)
export const Compass = createProfileIcon(CompassData)
export const Cpu = createProfileIcon(CpuData)
export const CreditCard = createProfileIcon(CreditCardData)
export const DollarSign = createProfileIcon(DollarSignData)
export const Download = createProfileIcon(DownloadData)
export const Edit2 = createProfileIcon(Edit2Data)
export const ExternalLink = createProfileIcon(ExternalLinkData)
export const Eye = createProfileIcon(EyeData)
export const EyeOff = createProfileIcon(EyeOffData)
export const FileText = createProfileIcon(FileTextData)
export const Filter = createProfileIcon(FilterData)
export const Globe = createProfileIcon(GlobeData)
export const GraduationCap = createProfileIcon(GraduationCapData)
export const Heart = createProfileIcon(HeartData)
export const HelpCircle = createProfileIcon(HelpCircleData)
export const Home = createProfileIcon(HomeData)
export const Image = createProfileIcon(ImageData)
export const Info = createProfileIcon(InfoData)
export const KanbanSquare = createProfileIcon(KanbanSquareData)
export const Key = createProfileIcon(KeyData)
export const Layers = createProfileIcon(LayersData)
export const Lightbulb = createProfileIcon(LightbulbData)
export const Link2 = createProfileIcon(Link2Data)
export const Lock = createProfileIcon(LockData)
export const LogOut = createProfileIcon(LogOutData)
export const Mail = createProfileIcon(MailData)
export const MapPin = createProfileIcon(MapPinData)
export const MessageCircle = createProfileIcon(MessageCircleData)
export const MessageSquare = createProfileIcon(MessageSquareData)
export const Mic = createProfileIcon(MicData)
export const Monitor = createProfileIcon(MonitorData)
export const Moon = createProfileIcon(MoonData)
export const MoreHorizontal = createProfileIcon(MoreHorizontalData)
export const Package = createProfileIcon(PackageData)
export const Palette = createProfileIcon(PaletteData)
export const Paperclip = createProfileIcon(PaperclipData)
export const Phone = createProfileIcon(PhoneData)
export const Play = createProfileIcon(PlayData)
export const Plus = createProfileIcon(PlusData)
export const QrCode = createProfileIcon(QrCodeData)
export const RefreshCw = createProfileIcon(RefreshCwData)
export const RotateCcw = createProfileIcon(RotateCcwData)
export const Scale = createProfileIcon(ScaleData)
export const Search = createProfileIcon(SearchData)
export const Send = createProfileIcon(SendData)
export const Settings = createProfileIcon(SettingsData)
export const Share2 = createProfileIcon(Share2Data)
export const Shield = createProfileIcon(ShieldData)
export const ShieldCheck = createProfileIcon(ShieldCheckData)
export const ShoppingBag = createProfileIcon(ShoppingBagData)
export const SlidersHorizontal = createProfileIcon(SlidersHorizontalData)
export const Smartphone = createProfileIcon(SmartphoneData)
export const Smile = createProfileIcon(SmileData)
export const Sparkles = createProfileIcon(SparklesData)
export const Star = createProfileIcon(StarData)
export const Store = createProfileIcon(StoreData)
export const Sun = createProfileIcon(SunData)
export const Tag = createProfileIcon(TagData)
export const Target = createProfileIcon(TargetData)
export const Trash2 = createProfileIcon(Trash2Data)
export const TrendingUp = createProfileIcon(TrendingUpData)
export const Upload = createProfileIcon(UploadData)
export const User = createProfileIcon(UserData)
export const UserCheck = createProfileIcon(UserCheckData)
export const Users = createProfileIcon(UsersData)
export const Video = createProfileIcon(VideoData)
export const X = createProfileIcon(XData)
export const XCircle = createProfileIcon(XCircleData)
export const Zap = createProfileIcon(ZapData)
