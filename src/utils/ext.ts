
interface Date {
    addDay(day: number): Date
}

Date.prototype.addDay = function (day: number): Date {
    this.setDate(this.getDate() + day)
    return this
}
