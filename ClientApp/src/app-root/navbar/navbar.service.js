import { BehaviorSubject } from "rxjs/BehaviorSubject";

export const navbarServiceFactory = () => {
    const service = {}

    service.init = () => {
        service.title$ = new BehaviorSubject("No Title")
        return service
    }

    service.setTitle = (title) => service.title$.next(title)

    return service.init()
}