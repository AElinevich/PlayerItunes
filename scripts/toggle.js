export const toggle = (event, player, volume, audio) => {
    // чтобы изначально звук был на 50%
    player.volume = 0.5;
    volume.value = volume.volume * 100;

    let target = event.target
    if(target.closest(".down")) {
        player.volume = 0;
        volume.value = 0;}
        else if (target.closest(".up")) {
            volume.value = 100;
            player.volume = 1;
        }
}