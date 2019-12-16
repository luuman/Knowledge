## homebrew 终端命令管理工具

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

> 注意

Error downloading Command Line Tools (macOS Mojave version 10.14) for Xcode: 未能验证该更新。
需要安装Xcode

### git

```bash
brew install git
cd ~/. ssh 检查本机的ssh密钥
ssh-keygen -t rsa -C "邮件地址@youremail.com"
<!-- 生成git rsa -->

git config --global user.name "cnfeat" // 用户名
git config --global user.email "cnfeat@gmail.com" // 填写自己的邮箱
```

### nvm node包管理工具

```bash
brew install nvm
```

```bash
nvm install 12.10
nvm use 12.1
nvm ls
```

### node
mac 卸载node

```bash
sudo npm uninstall npm -g
sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
sudo rm -rf /usr/local/include/node /Users/$USER/.npm
sudo rm /usr/local/bin/node
sudo rm /usr/local/share/man/man1/node.1
sudo rm /usr/local/lib/dtrace/node.d
```

## 终端美化
.bash_profile

```bash
find_git_branch () {
  local dir=. head
  until [ "$dir" -ef / ]; do
    if [ -f "$dir/.git/HEAD" ]; then
      head=$(< "$dir/.git/HEAD")
      if [[ $head = ref:\ refs/heads/* ]]; then
        git_branch="<${head#*/*/}>"
      elif [[ $head != '' ]]; then
        git_branch="<(detached)>"
      else
        git_branch="<(unknow)>"
      fi  
      return
    fi  
    dir="../$dir"
  done
  git_branch=''
}
# for color
export CLICOLOR=1
# \h:\W \u\$
PROMPT_COMMAND="find_git_branch; $PROMPT_COMMAND"
# export PS1='\[\033[01;33m\]\u:\[\033[01;31m\] \W\[\033[00m\] $git_branch\[\033[01;33m\]\$\[\033[00m\] '
# export PS1='\[\033[01;33m\]\u@\[\033[01;31m\]\W\[\033[00;30m\] $git_branch\[\033[01;31m\]\$\[\033[00m\] '
# export PS1='\[\033[01;33m\]\u@\[\033[01;31m\]\W\[\033[00;30m\] $git_branch\[\033[00;31m\]\$\[\033[00m\] '
# luuman@Coding $
export PS1='\[\033[01;33m\]\u@\[\033[01;31m\]\W\[\033[00;31m\] $git_branch\[\033[01;31m\]\$\[\033[00m\] '
# luuman@Coding $
# export PS1='\[\033[01;33m\]\u\[\033[01;32m\]@\033[01;31m\]\W\[\033[00;31m\] $git_branch\[\033[01;32m\]\$\[\033[00m\] '

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

alias proxy-on='export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;'
alias proxy-off='unset http_proxy;unset https_proxy'
alias setproxy="export ALL_PROXY=socks5://127.0.0.1:1087"
alias unsetproxy="unset ALL_PROXY"

# alias proxy='ALL_PROXY=socks5://127.0.0.1:1086'
# alias unproxy='unset all_proxy'
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```