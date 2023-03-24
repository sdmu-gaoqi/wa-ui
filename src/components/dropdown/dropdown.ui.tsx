import styled, { keyframes } from 'styled-components';
import { cssPixel } from '../../constants/constants';
import { concatCss } from '../../utils/utils';

export const DropdownAnmation = keyframes`
from {
  opacity: 1;
  transform: translateY(-50%);
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

export const StyledDropDownWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  animation-name: ${DropdownAnmation};
  animation-duration: 0.2s;
  animation-timing-function: linear;
`;
export const StyledDropDownContent = styled.div`
  width: 100%;
`;
export const StyledDropDownLine = styled.div`
  width: 100%;
  position: relative;
  border-top: 1px solid #f0f0f0;
  padding: 16px;
  display: flex;
  align-items: center;
  .${cssPixel}dropdown-card-icon {
    margin-left: auto;
    opacity: 0;
  }
`;
export const StyledDropDownMask = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  animation-name: ${MaskAnmation};
  animation-duration: 0.2s;
  animation-timing-function: linear;
  overflow: hidden;
  z-index: 2;
`;
export const StyledMenu = styled.div.attrs({
  className: concatCss('dropdown-menu'),
})`
  overflow: hidden;
  .${cssPixel}dropdown-menu-activeItem {
    color: var(--wa-baseui-primary-active);
  }
  .${cssPixel}dropdown-menu-item {
    display: flex;
    padding: 16px;
    align-items: flex-start;
    &:active {
      color: var(--wa-baseui-primary-active);
    }
  }
  .${cssPixel}dropdown-menu-item-content {
    &-title {
    }
    &-desc {
    }
  }
  .${cssPixel}dropdown-menu-item-suffix {
    margin-left: auto;
  }
`;
