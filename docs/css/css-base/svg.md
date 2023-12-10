
# 技巧

## svg 颜色根据 css 设置

二选一即可，然后 svg 颜色即可跟随 dom 上的 color 变化
1. svg 上加 fill="currentColor"，path 上删掉 fill="..."
2. path 上加 fill="currentColor"