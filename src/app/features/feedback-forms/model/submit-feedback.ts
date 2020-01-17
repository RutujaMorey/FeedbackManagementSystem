export interface UnregisteredFeedback {
    eventId: string,
    email: string,
    unregisteredReason: string
}
export interface ParticpatedFeedback {
    eventId: string
    email: string,
    rating: number,
    improvements: string,
    likes: string
}
export interface NotParticpatedFeedback {
    eventId: string,
    email: string,
    notParticpatedReason: string

}
