export default function generatePowershellCommand(programName: string, downloadUrl: string) {
    const installerFileName = downloadUrl.split('/').pop();

    const silentArgs = '/S /norestart /quiet /silent';

    const powershellTemplate = `$downloadUrl = "${downloadUrl}"\n$installerPath = "$env:TEMP\\${installerFileName}"\nInvoke-WebRequest -Uri $downloadUrl -OutFile $installerPath\nStart-Process -FilePath $installerPath -ArgumentList '${silentArgs}' -NoNewWindow -Wait\nRemove-Item $installerPath`;

    return powershellTemplate.trim();
}