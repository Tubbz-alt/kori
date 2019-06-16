import {useTranslation} from 'react-i18next';
import * as React from 'react';
import {useLocalStore, useObserver} from 'mobx-react-lite';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

export default function LanguageSelector() {
  const {t, i18n} = useTranslation();
  const ref = React.useRef(null);
  const store = useLocalStore((source: any) => ({
    open: false,
    value: source.value,
    doClose(e) {
      if (ref.current && ref.current.contains(e.target)) {
        return;
      }
      store.open = false;
    },
    doToggle(e) {
      store.open = !store.open;
    },
    doSelect(v) {
      i18n.changeLanguage(v, () => store.open = false)
    }
  }), {value: i18n.language});


  const options = [
    {label: 'English', value: 'en'},
    {label: '中文', value: 'zh-CN'},
  ];
  console.log(i18n);

  return useObserver(() =>
    <div>
      <ButtonGroup variant="contained" color="primary" ref={ref}>
        <Button>
          {(options.find(v => i18n.language.includes(v.value)) || {label: 'English'}).label}
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          aria-owns={open ? 'selection-list' : undefined}
          aria-haspopup="true"
          onClick={store.doToggle}
        >
          <ArrowDropDown />
        </Button>
      </ButtonGroup>
      <Popper
        open={store.open}
        anchorEl={ref.current}
        transition
        disablePortal
      >
        {
          ({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper id="selection-list">
                <ClickAwayListener onClickAway={store.doClose}>
                  <MenuList>
                    {
                      options.map(v => (
                        <MenuItem
                          key={v.value}
                          selected={i18n.language.includes(v.value)}
                          onClick={() => store.doSelect(v.value)}
                        >
                          {v.label}
                        </MenuItem>
                      ))
                    }
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )
        }
      </Popper>
    </div>
  );
}
