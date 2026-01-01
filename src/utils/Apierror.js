class Apierror extends Error
{
    constructor(statuscode,message="something went wrong")
    {
         super(message);
         this.statuscode=statuscode,
         this.message=message,
         this.data=null,
         this.success=false
    }
}
export {Apierror};