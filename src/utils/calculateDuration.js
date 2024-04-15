
export const calculateDuration = (duration) => {
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration % 3600) / 60);
    return [hours, minutes]
}