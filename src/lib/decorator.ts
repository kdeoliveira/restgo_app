
const Service = ({path}: {path : string}) : MethodDecorator => {

    return <T>(target : Object, propertyKey: string | Symbol, descriptor : PropertyDescriptor)  :void => {
        let method = descriptor.value!;

        descriptor.value = function(args : any[]){
            const post_str = arguments[0]

            arguments[0] = path.charAt(path.length - 1) == "/" ? path.concat(post_str) : path.concat("/"+post_str)

            return method.apply(target, arguments)
        }
    }
}

export default Service