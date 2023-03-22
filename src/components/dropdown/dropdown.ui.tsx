import styled, { keyframes } from 'styled-components';
import { cssPixel } from '../../constants/constants';
import { concatCss } from '../../utils/utils';

export const StyledDropDownWrapper = styled.div`
  width: 100%;
  background-color: #fff;
`;
export const StyledDropDownContent = styled.div`
  width: 100%;
`;
export const StyledDropDownLine = styled.div`
  width: 100%;
  position: relative;
`;
export const StyledDropDownMask = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1) 100%;
`;
export const StyledMenu = styled.div.attrs({
  className: concatCss('dropdown-menu'),
})`
  .${cssPixel}dropdown-menu-activeItem {
    background-color: var(--wa-baseui-primary);
  }
  .${cssPixel}dropdown-menu-item {
    display: flex;
    padding: 16px;
    &:hover {
      background-color: var(--wa-baseui-primary-hover);
    }
  }
  .${cssPixel}dropdown-menu-item-content {
    &-title {
    }
    &-desc {
    }
  }
`;

export const DropdownAnmation = keyframes`
from {
  opacity: 0;
  transform: translateY(-100%);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

export const MaskAnmation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
