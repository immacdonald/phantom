import { withVectorIcon } from '../components';
// Icons sourced from https://fonts.google.com/icons using: weight 400, grade 0

import GroupFilledSVG from './group_filled.svg?react';
import LinkSVG from './link.svg?react';
import MinusSVG from './minus.svg?react';
import MoonFilledSVG from './moon_filled.svg?react';
import MoonSVG from './moon.svg?react';
import PersonFilledSVG from './person_filled.svg?react';
import PlusSVG from './plus.svg?react';
import SunFilledSVG from './sun_filled.svg?react';
import SunSVG from './sun.svg?react';
import UploadFileSVG from './upload_file.svg?react';

export const GroupFilled = withVectorIcon(GroupFilledSVG);
export const Link = withVectorIcon(LinkSVG);
export const Minus = withVectorIcon(MinusSVG);
export const Moon = withVectorIcon(MoonSVG);
export const MoonFilled = withVectorIcon(MoonFilledSVG);
export const PersonFilled = withVectorIcon(PersonFilledSVG);
export const Plus = withVectorIcon(PlusSVG);
export const Sun = withVectorIcon(SunSVG);
export const SunFilled = withVectorIcon(SunFilledSVG);
export const UploadFile = withVectorIcon(UploadFileSVG);

export * from './charting';
export * from './navigation';
