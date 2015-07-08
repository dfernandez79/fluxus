DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd $DIR
rm -rf ../Fluxus.app
mkdir -p ../Fluxus.app/Contents/Resources/app/bin
mkdir -p ../Fluxus.app/Contents/Resources/app/lib
mkdir -p ../Fluxus.app/Contents/Resources/app/resources

mkdir ../Fluxus.app/Contents/MacOS
cp -R ../resources/*.workflow ../Fluxus.app/Contents/Resources/app/resources
cp ../resources/Info.plist ../Fluxus.app/Contents
cp `which node` ../Fluxus.app/Contents/Resources
cp ../bin/fluxus ../Fluxus.app/Contents/Resources/app/bin
cp ../resources/fluxus.sh ../Fluxus.app/Contents/Resources
cp -R ../lib ../Fluxus.app/Contents/Resources/app
cp -R ../node_modules ../Fluxus.app/Contents/Resources/app
cp ../resources/Icon.icns ../Fluxus.app/Contents/Resources
cp ../resources/start.sh ../Fluxus.app/Contents/MacOS
