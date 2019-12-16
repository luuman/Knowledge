```
cd $WORKSPACE
source  /etc/profile
env="qa" # 环境
project="wavely-h5-${env}" # 工程名
git_dir="/fe-release/boss-test/" # 发布工程的根目录
git_dist="${git_dir}wavely/${project}" # 发布工程的目标目录
# 编译
yarn
yarn rel -- --publicPath  https://fe-wavely-qa.weizhipin.com/cdn/$project/ --pathPrefix /$project --api http://192.168.1.117:9393
# git pull
cd $git_dir
git pull
# 拷贝文件
cd $WORKSPACE
rm -rf $git_dist/* || echo "rm failed"
mkdir -p $git_dist/ && chmod -R 755 $git_dist
cp -rf dist/* $git_dist
# git push
cd $git_dir
git add -A
git commit -m "v$BUILD_NUMBER"
git push origin master
```
