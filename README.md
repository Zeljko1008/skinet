# Skinet

## Build a proof concept e-commerce store using Angular, .Net and Stripe for payment processing

### Set up

- extensions

1. c# powered by OmniSharp
2. c# extensions powered by JosKreativ
3. Material Icon Theme
4. nuget Gallery Extension
5. SQLite (only for development)

### API Basics

- API Basics
- Using the dotnet CLI
- Reviewing the project templates
- Running the app
- EF Migretions
- Postman
- Using git for source control

1. Creating the web API project

`dotnet -h` - command list  to do things
`dotnet new list`-command to create diferent project templates that we can create with command line
`mkdit skinet` - command for create new folder
`dotnet new sln` - command to create solution file
`dotnet new webapi -n API` - command to create webapi and that's what we going to call our project
`dotnet sln add API` - command to add API to solution
`code .` -inside skinet folder command to open our project in VSc

2.Running our project

![simplyfy json](<Assets/ReadmeImages/Screenshot 2024-07-19 145440.png>)*simplyfy json file*

3.Addind first API controller ![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 160148.png>)

4.Adding entity class:

- good place to start app like this is to create first entity
- create a new folder Entities inside of Api where we create our first entiti Product
-  

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 161513.png>)

5.Setting up Entity framework

- from Nugget galery we instal :
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 162145.png>)
*take care about what version you download*
- also install:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 162714.png>)

- inside of API folder we open a folder Data and inside Data folder we gona create our Store context class that is comunicate with our database
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 163032.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 164138.png>)

6.Adding a connection string

- for development mode we put our connection string in appsettings.Development.json file

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 170331.png>) *very simple for Sqlite*

- after that in program.cs inside our services container we say our application about our context
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 170837.png>) *look out for typos when typing strings*

7.Adding an Entitiy Framework migration

- first install or update:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 171441.png>)

- in terminal wrote :

PS C:\Users\zac10\skinet> `dotnet ef migrations`

commands for add or remove migrations but in API folder:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 183602.png>)

- after we done migrations we can check in Migration folder inside of Data folder :
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 184156.png>)

8.Update database

- in terminal in API folder we give command `dotnet ef database update` for update our new database

- we can add a new query to populate our database with some products so we can try to send it to our api for tests:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 185113.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 185409.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 185518.png>)

9.Reading the data from the Database in the API

- we create a constructor and initialize field from parametar:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 190003.png>)

- in the extension settings we can provide sintax for _context initializing field :
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 190203.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 190449.png>)

- we add async  Task for getting products from database:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 191114.png>)

- and if we check with postman we get our resaults:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 191440.png>)

- we do same thing for our product:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 191707.png>)

10.Creating the additional projects

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 192310.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 192658.png>)

- adding a references

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 192835.png>)

- and restore it:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 192959.png>)
- we remove some folders on diferent places, Data folder in Infrastructure project and Entities in Core project so we have to change their namespaces and change their settings:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 193952.png>)

- we also need to cut Package reference from Api.csproj to Infrastructure.csproj for entity Framework Core Sqlite:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 194147.png>)

- after all changes again `dotnet restore` & `dotnet build`
- check again in postman

11.Add Repository Pattern

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-19 201756.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 151413.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 151747.png>)

12.Adding a Repository and Interface

-Now what we do and what we want to do is we're going to create an interface for the repository first.And this is going to form a contract with the actual repository that we're going to create.And the interface is going to specify what methods we are going to support in that particular repository.So interfaces as part of our architecture design are going to all go in the core folder.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 152703.png>)

*What we'll do now is create the concrete class, which is going to implement this particular interface.*

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 153157.png>)
*So what we need to do is used a quick fix and we can implement the interface inside here.*

-So we need to add this as a service and to do that we'll need to head over to our program class.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 153550.jpg>)

13.Adding the repository methods

-Now, our repository is going to be interacting with our store context, and then our controllers are going to use the repository methods. In order to retrieve the data from our database.
-So let's go ahead and generate the constructor for the product repository and we'll add our store context in here:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 154136.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 154329.png>) *adding our 2 metods*

-We can go back to our product controller and replace the store context with our repository.
-So let's remove what we have inside here and we're going to replace store context with I product.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 154718.png>)

-And all we're going to do here is simply replace the methods that we're calling the context and replace them with our repository methods:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 155356.png>)

-So what we want to do is make sure that our changes are still working so we test it in Postman.

14.Extending the products entity and creating related entities
-what we're going to do is we're going to create a base entity which is just going to contain our ID, and that's going to serve two purposes one which will be obvious, and the other one will make use of a bit later.

-But first of all, let's create a new class and we'll call it base entity.And inside this class, we're just going to have a single property, an integer of ID, and that's it.And what we're going to use this base entity for, at least right now, is we're going to derive our
entity classes from this base entity.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 170502.png>)

-product type and we'll also do the same for the product brand as well and generate class product brand in new file.And both of these new entities we're creating, they're both going to derive from base entity again and they're just going to have a single property of name.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 171009.png>)

-And the way that we've configured this or the way that we've added these properties in here to give it the full type as well as the ID is to help out entity framework so that when it creates or when we create a new migration, it's going to know that the product has a relationship with both the product type and the product brand, and it's going to use this information to set up those relationships for us as well as the foreign Keys and what we also need to do so that we can query these product types and brands is we want to go to our infrastructure project and go to our store context and also add these as DB sets as well, just as we did for our product.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 171424.png>)

15.Creating a new migration for the entities

-we going to drop our database and migrations
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 171740.png>)
-And what we want to do now is generate a new migration.

16.Configuring the migrations

-in this case we need to tell it about how we want our migration to be created and we can configure our entities
So what we'll do is we'll go to our data folder inside the infrastructure project and we'll create another new folder and we'll call this one config.And in here, if we want to configure our entities different to how entity framework core creates our migrations, then we can do so by creating some additional classes:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 175653.png>)
-And what we need to do is tell our store context that there's configurations to look for.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 180817.png>)
-repeat the commands to create a new migration:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 181013.png>)

17.Applying the migrations and creating the Database at app startup

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 182014.png>)

-So we use that using keyword there because then we know that the disposed method is going to be called after we finished with this

-after that we start our app:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 182213.png>)

18.Adding Seed data

-we're just going to file Explorer and we want to be inside our infrastructure data folder and we'll create a new folder called Seed data inside who we seed products formatted as JSON.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 183101.png>)
-Now, we can use JSON to read from this file inside code, and we can use that to populate our database.
-So we'll create a new class inside the data folder and we'll call it store Context Seed.
-We just want to update our database and we're going to call it seed async, and we're going to pass in as a parameter our store context and we'll call it context.
-And inside here we're going to effectively read from our JSON files d serialize that JSON into our C sharp objects and then add those objects into our database.

```c#
using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            
            if(!context.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrands.AddRange(brands);
                            }
            if(!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.ProductTypes.AddRange(types);
                

            }
            if(!context.Products.Any())
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                context.Products.AddRange(products);
                
            }
            if(context.ChangeTracker.HasChanges())
            {
                await context.SaveChangesAsync();
            }
        }

    }
}
```

*Now we need to tell our program class it's got another job and that's to execute this seed data method:*
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 184710.png>)

19.Adding the code to get the product brands and types

-for now we use IproductRepository to add our metods to Get brands and types of products:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 185720.jpg>)
-after that in ProductRepository implement interface :
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 185850.png>)
-implement our 2 methods:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 190351.png>)
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 190522.png>)
-And then we can head over to our products controller and we can just create the two additional methods

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 191324.png>)
-make sure these work in Postman

20.Eager loading of navigation properties

-we're talking about here is loading of navigation properties
-We can lazy load them, which means that entity framework will automatically load any navigation properties such as the brand and the type.It's good for the developer because it's lazy and we don't need to worry about returning the entities,the navigation properties alongside the entity.But it's something to be careful with because you might not always want these navigation properties to be returned with every entity.So what we're going to take a look at is eager loading, where we explicitly tell entity framework that
we want to load a navigation property alongside the entity that we're returning.
-And we need to go to our repository to do this because this is a feature of the context.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-22 192924.png>)
-test in Postman

### Generic Repository

1.Creating a Generic repository and interface

-So let's go to our interfaces, first of all, and we'll create a new C-sharp interface and we'll just call this one I generic.
-constrain this so that we can only use certain types with this particular generic repository.And the way that we do that is by specifying where and then we say T where and then we add a colon and we say is a type of in this case we only want this to be usable by classes that derive from our base entity.
-This means that only our entities can be used with our generic repository.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 154459.png>)

-So inside the data folder, let's create a new class and we'll call it generic repository.
-again, we need to specify the T for type and specify that we're going to be using the Igeneric.
-we'll also need to bring in the core interfaces here as well
-And we need to match the constraints in here as well.So we'll specify where RT.Is of type based entity.
-And then we should be good to go and actually implement the interface.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 155004.png>)

-And just like any other interface and implementation class, we need to add this to our services container.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 155308.png>)

2.Implementing the methods inside the generic repository

-We'll just make sure we can get an individual thing and a list of things as well.
-first of all, let's deal with the get by ID async.
-And just like in our actual product repository, we also need to bring in the store context here.So let's bring in a constructor.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 155840.png>)

- after that we create our 2 methods:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 160157.png>)

-that seems straightforward enough when it comes to running or using this, then this gets replaced with whatever thing we pass in as the type when we use this particular repository.

-in ProductController we're going to remove our Iproduct repository and we'll get rid of this this single easy to use repository,and we're actually going to replace it with three repositories now because technically now we've got a generic repository.

-Each one of our entities is going to have its own repository.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 160913.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 161152.png>)

-But the reason is, is due to the fact that in our product repository we had these include statements and in our generic repository, we don't have the ability to add the include statements.So what we need is a strategy for dealing with this.And what we're going to talk about next is the specification pattern, which is how we get around this.

3.Creating a specification class

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 163656.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 163817.png>)

- we can name this specification with a meaningful name, this allows us to use our generic repository without needing to derive from this repository with additional derived, more specific repositories.And instead we can control the data that we're returning from our database with specifications. And even if we've got 100 entities or three entities, we still don't need to create any more additional repositories.But when we do need specific subset of data from our database, we simply create a specification and then pass that as a parameter to our list.

-So what we'll do is we'll create a specification that replaces this particular functionality:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 164324.png>)

-So let's create a new folder and we'll call it specifications.And inside here we'll create a new interface called I specification.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-23 164801.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 134358.png>)
-Now we've got our specification here and what we're going to use is a base specification that's going to implement these interface methods.
-So again, let's go back to our core project and again inside the specifications folder, we'll create a new class and this time we'll call it base specification.And this one's going to implement our AI specification interface.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 135112.png>)
*And what we'll take a look at next is creating a specification evaluator class that's going to take a look at what's been provided in our specification, evaluate it.And then creates an IQuariable that we can pass to a two list function and actually executes the specification.So the specification evaluator is coming up next*

4.Creating a specification evaluator

-specification evaluator, something that's going to take in our specification, our list of queries and expressions and evaluate them and generate the IQuariable that we're then going to return so that we can create a list from the list of expressions that we've
built up in our specification evaluator.

-Now, our specification evaluator is going to be part of our infrastructure project inside the data folder:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 141152.png>)

-This code represents the SpecificationEvaluator `<TEntity>` class, which is used to create queries based on specifications (ISpecification`<TEntity>`) for entities (TEntity) in Entity Framework Core. The class is generic and works with any entity that inherits from BaseEntity.
-SpecificationEvaluator`<TEntity>`is a generic class that requires TEntity to inherit from BaseEntity.
GetQuery is a static method that takes an IQueryable`<TEntity>` as the input query (inputQuery) and a specification (spec), and returns an IQueryable`<TEntity>`.
-If Criteria is not null, a Where condition is applied to the query.

-So what we'll do is we'll just open up our generic repository interface and we're going to add two additional methods here.
That's going to take a specification as a parameter:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 141853.png>)

-So now that we have our interface with our two new methods, what we're going to do now is go to our actual generic repository and implement both of these.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 142056.png>)
-And what we're going to need to do here in addition to implementing these methods is create a new method inside our repository, which is going to allow us to apply our specifications:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 142801.png>)

5.Using the specification methods in the controller

-inside  Specification folder we crerate new class `ProductWithTypesAndBrandsSpecification`

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 143802.png>)
*-we have to derive BaseSpecification in our class so we first have to create another constructor in BaseSpecification class that is empty,after that we create constructor in our new class and add Include statment for ProductWithTypesAndBrandsSpecification*

-And now we're ready to actually use this specification inside our products controller.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 144543.png>)
*And now we're back to where we started from what we've done, after all, that work is effectively got back to where we were before in our products repository.*

6.Getting a single product with specification

-So back in the specification, let's generate the other type of constructor and this is the one that's going to take the criteria.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 145516.png>)

-The parameters are empty and we can use the other constructor so that we can pass in the criteria.Now the criteria in this case is we want to get a product with a specific ID and that's what we'll use this one for.
-So back in the specification, let's generate the other type of constructor and this is the one that's going to take the criteria.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 151957.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 152219.png>)

-Now we can head back to our products controller and what we can do is we can create a spec:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 152434.png>)

-test in Postman

7.Shaping the data to return with DTOs

-And what we're going to do now is create an object that we can use to return the data in the format that we want it to be.Now these are going to be held in our API and we'll call it DTO or DTOs.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 155705.png>)

and then in our controller:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 160016.png>)

-So we'll go back to VS code and we'll find the Get Products method.
We'll do the same thing again.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 160451.png>)

8.Adding AutoMapper to the API project

Because writing out mapping code for every time we want to do such a thing can become a little bit tedious.We'll take a look at using a popular utility that's going to automate the mapping for us between our entities and our DTOs.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 161108.png>)
*first we need install*

- Inside Api wecreate new folder Helpers, and new class MappingProfiles, and add constructor:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 162238.png>)

- and we need to add this to our program class as a service.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 162444.png>)

-And what we need to do here is we need to inject auto mapper into our controller:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 162702.png>)

-And then what we can do is we can come down to our get product and instead of returning this new products DTO, we can remove the code in there.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 162908.png>)

-and test it in Postman
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 163045.png>)

9.Configuring AutoMapper profiles

-Now the reason we were seeing a strange result in Postman is because our product type has the same name,but in this case it's a string.And in this case it's a class:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 165158.png>)
*So what we need to do is tell Automapper about these two properties and tell it explicitly what we want it to return these as*

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 165619.png>)
*d for destination, o for option , s for source*

-and in our controller do same for products:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 170146.png>)

10.Adding a Custom Value Resolver for AutoMapper

-we need to deal with the images here because we don't want to return them like this because our client is going to try and access the images locally, but we're actually going to serve the images from our API server.

So we're going to create a helper class that's going to use a value resolver so that we can map from our picture URL to our API address plus the picture URL and let's see how this is going to work.
-What we'll do is we'll go to our app settings, dot development dot Json and we'll add a property in here for our API URL.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 170818.png>)
*And what we're going to do is inject the configuration into the class that we're about to create so that we've got access to what this address is*

In folder Helpers we create new class ProductUrlResolver and use AuttoMapperHelper here that is coming from IValueResolver.And because this is an interface, we need to implement the interface.
So what we want to do is add this constructor and then we'll say I configuration.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 171655.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 172012.png>)

-So how we use this, we go back to our mapping profile and we'll add a third configuration here.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 172250.png>)

11.Serving static content from the API

-we've not actually added any images to our API and our API server is not configured to serve static content from the Api so we can't see our images in Postman yet.
-It can only receive and respond to HTTP requests, but it does not know what to do with a static file request, like an image or JavaScript or anything like that.And we're going to need to tell it to serve that kind of content.
-And we'll go back to our API controller, and inside the API folder will create a folder inside here called w w w root and paste images into it. And now we just need to tell our API that it has another job and that's to serve static content.
-So we'll head over to the program class to do so, and positioning inside the HTTP request pipeline is always important.And we're going to tell it to serve static files just above use authorization:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-24 173318.png>)

### API Error Handling

1.Creating a test controller for errors

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 101351.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 101428.png>)

-So what we're going to do in this particular lesson is we're just going to set things up so we can easily test our error responses that we send back from our server.
-First of all, first of all, we'll create a new controller that's going to act as a base controller,and this will just save us typing out the same thing on every single controller that we create.So we've got these API controller that's going to be standard for every controller and this route as well is also going to be standard for every controller.
-So we might as well create a base controller.And then instead of deriving from controller base, we'll derive from our new base controller.
-So let's create a new class and we'll call it base API controller.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 102407.png>)

-And we can use this now in our existing controller.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 102726.png>)

What we'll do is we'll create a new controller and we'll just call this buggy controller that we're just going to use to set up some errors so that we can see the different kinds of responses that our
API will return when it encounters certain types of errors.

-And what we'll do is we'll just create four methods in here just for simple get methods:

```c#

using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        private readonly StoreContext _context;

    
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Products.Find(42);
            if(thing == null)
            {
                return NotFound();
            }

            return Ok();
        }
        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(42);
            var thingToReturn = thing.ToString();
            return Ok();
        }
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest();
        }
        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
        
    }
}

```

*And our goal as nice API developers is to make our error responses consistent so that our clients can easily consume them and handle them on the client side.*

2.Creating a consistent error response from the API

-And inside our API project will create another new folder.And we'll just call it errors.And inside here, we'll create a new class and we'll just call this one API response.

```c#
namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);  //And this double question mark, by the way, this is the null coalescing operator.And it basically means if this is null, then execute.What's to the right of these question marks?



        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)   
        {
            return statusCode switch//Now, this switch expression, instead of saying switch and then using the case and the break statements,we can literally just put in the status code that we're looking for.


            {
                400 => "A bad request, you have made",
                401 => "Authorized, you are not",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger. Anger leads to hate. Hate leads to career change",
                _ => null//And in that case, this will be an underscore and we'll use the arrow and we'll simply return null.

            };
        }
        
    }
}
```

*And what we want to do is based on the status code that we're passing in here, we're just going to return our own default messages so that each type of error has at least a message.*

-So what we'll do is we'll utilize this response when we're returning an error response that we create
-So let's go back to the buggy controller again and let's take a look at where we can actually use this.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 115338.png>)
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 115448.png>)

-Now the validation one we need to do some extra work with and we also need to do some extra work with the server error as well.

3.Adding a not found endpoint error handler

-First of all, we're going to need to create a controller that we can redirect the response to so that it can generate our consistent API response.And if we go in, our controllers will create another new controller, and this one will simply call error controller.

-Now what we'll do with this one is we'll override the routes that we get from our base API controller and we'll specify a root property in here.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 120539.png>)

So how do we get a request that's come into our API and get it passed to this particular controller?And we looked at an area earlier on if we want to modify a request as it's coming into our pipeline in the API, then in order to achieve that, we use middleware and we go to our program class to add the middleware that we want and because we want something to happen right at the beginning of this request.
-And any error handling really goes at the top of our HTTP request pipeline.
-Now, in the minimal API that's provided by dot net six and above, then there's a hidden piece of middleware that we don't actually see, but it's the developer exception page.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 120836.png>)

-But in our case, if we don't have an exception, we simply want to redirect the user to our new errors controller.And we can do that by using a piece of middleware called App Use status code pages with re execute inside

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 121147.png>)

-And what we'll take a look at next is doing something for our exception handling rather than leave it to our developer.Exception handling will actually do something with this so that we can format it a bit more nicely when we return it to the client

4.Creating Exception handler middleware

-And again, we still want to provide our clients with a consistent error experience, which means we're going to have the status code and a message, but in the case of an exception.Then we're also going to provide, as long as they're in development mode, this stack trace as well,because even though it can be quite long in the first few lines, there's always some useful information about where the exception was generated from.
-In the ApiResponse we want to do here is we want to extend our API response to accommodate the extra field that we want to send down with the response.

-So what we'll do is we'll go to our Errors folder and we'll create another new class and this one will call API exception.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 121834.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 122000.png>)

-So with that in place, what we'll do is we'll create some middleware so that we can handle exceptions and use this particular class in the event that we get an exception.

-inside the API folder we'll create another new folder and this one will call middleware.

-Now, when we created this, we used the request delegates.And this is a function that can process an HTTP request.And we called it next.Now, if there is no exception, we want the middleware to move on to the next piece of middleware.So what we'll do is we'll use next and in the try, we'll say await next and then pass passing the context.And this means if there's no exception, then the request moves on to its next stage.Now, if there is an exception, then we want to catch it.
-Now, our logging system is just the console and we will see it inside there if we get an error.And what we'll also do is write our own response into the context response so that we can send it to the client.
-All of our responses are going to be sent as JSON formatted responses and then we'll say context response
status code is equal to and will cast this to an INT and we'll say HTTP status code.
And then we can use the internal server error.And this basically means that we're going to set the status code to be a 500 internal server error.

```c#

using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Middleware
{
    public class ExeptionMiddleware
    {
        private readonly ILogger<ExeptionMiddleware> _logger;
        public readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;

        public ExeptionMiddleware(RequestDelegate next, ILogger<ExeptionMiddleware> logger,
            IHostEnvironment env)
        {
            _env = env;
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new ApiException((int) HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString())
                    : new ApiException((int) HttpStatusCode.InternalServerError);
                    var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                    var json = JsonSerializer.Serialize(response, options);
                    await context.Response.WriteAsync(json);

            }

    
}
}
}
```

-And we need to add this as a piece of middleware.And that means we're going to go back to our program class to add it inside there.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 124201.png>)

5.Improving the validation error responses

-Let's create another new class and this time we'll call it API validation error.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 125229.png>)
*I've still got the status code, still got the message, but this time we get our errors in an array with just the error messages inside them.*

6.Cleaning up the Startup class

So the idea is that we extend the functionality of this service collection and give it another method that we can use and we'll head over to our API folder and we'll create a new folder called Extensions.And create new class.And we're going to call it applicationServicesExtensions.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 131722.png>)

-And inside this class, any extension methods that we create, they have to be static and we create
-And we're going to create inside our static class a static method, and we're going to call it public static, and we're going to return from this and I service collection and we'll call our method add application services.And the first parameter in an extension method is the thing that we're actually extending, which is exactly what we're returning the service collection.But because it is an extension method, we need to use the keyword lists and then we say service collection as the thing that we are extending and we'll call it services.So we're also going to add as a parameter ie configuration and call it config.And then effectively what we're going to do from here is return the services.
-And we're going to cut all of our services.Well, most of them.I'm going to grab all of this, including the comments down to the app and cut this slots into my clipboard.Head back to the extension method and inside here it's going to paste all of this in try and reformat and bring in everything that we need.
-Can't see any errors and all of our services are now out of the way inside their own extension method.
-In order to use this extension method, we simply go back to our program class and underneath the ADD controllers we can say build a DOT services.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 132819.png>)
-And any time that we add a new service, we'll just be adding it to the application service extensions.

### API Paging,Filtering,Sorting & Searching

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 190229.png>)

1.Adding a sorting specification class

-So what we're going to need to do, we're going to need to open up our Ispecification and we're going to need to add support for two additional expressions.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 191028.png>)

-And then we can go to our base specification.
-And we'll just go ahead and implement the interface so that those two new expressions get added.
-And what we'll do is we'll remove this throw new not implemented exception and instead we'll give it a get and a private set because we'll add the ability to set what this is inside this particular class.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 191437.png>)

-And what we'll do is below the Add include, we'll just add two more methods, we'll add a protected.Void and we'll say add order by and we'll pass in our generic expression.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 191923.png>)

-Now, these methods need to be evaluated by our specification evaluator so they can get added to our queryable that we then return and pass to our method.That's going to call the to list.So what we need to do is open up the specification evaluator.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 192250.png>)

-So that's our specification set up to accommodate this.And what we need to do is capture this information from the client and we're going to do that in the query string of the Http request.
-after that in ProductController:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 192546.png>)

-Okay, so now let's go and take a look at our products with types and brands specifications.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 192823.png>)

-now what we want to do is accept the query string and make a decision based on which sort order we're And we'll allow users to sort by the alphabetical and by price and we'll give them two choices buy most expensive first and lowest price first as well.
-So we'll go back to the products and types, brands, specification.
And what we'll do in here is we'll just add some conditions to check the value of the sort and then we'll apply the correct ordering accordingly.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 193415.png>)

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 193649.png>)

-And it's telling us to convert the values to a supported type, or we can convert them inside our code to order the results.But what we can use here is a conversion.And what we'll take a look at is what we need to do to work around this specific problem with SQLite.

2.Working around the decimal problem in Sqlite

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 194533.png>)

3.Adding Filtering functionality

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 194842.png>)

-And then we can go across to our specification class again and we can add the functionality in here.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 195243.png>)

4.Adding Pagination

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 195734.png>)

-So let's go and implement this in our base specification class.

- first we implement our interface:

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 195908.png>)

-So what we'll do is we'll just use the get and private sets and set these on all of these properties.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 200208.png>)
-we'll add another protected void methods
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 200433.png>)

-And will make use of this property inside our specification evaluator.So that we know whether or not to page the results.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 200720.png>)

-What we'll take a look at next is what we need to pass to our products controller so that we can ask for our results to be paged.

-And at the moment we've got three properties we're passing in here just now. What we're also going to need is the page index or the page number, Which page do we want to get?We're also going to need the page size.And we've already reached the maximum comfort level of passing in parameters to our method here.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-25 201126.png>)

-So what we'll do is we'll create a new class that's going to store all of our parameters.And this will also give us an opportunity to set a maximum page size, the maximum number of results.
-We're prepared to return from our API for a single request, and it will also allow us to set a default page index and a default page size as well.
-And we want to do this inside the core project where our specifications live.And what we'll do is create a new class and we'll call this product params.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 163800.png>)
*So now we have this instead of taking individual strings inside our product controller.*
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 164222.png>)

-and we'll need to go and make an adjustment inside here now and update the properties because now we're going to be getting these from a the product spec params instead of the individual strings we have inside there at the moment.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 164749.png>)

-And it's always good to check just in case you get something like this now, because we're sending up our parameters as a query string.But we've told our API controller that these are an object now, then this is going to start to look at the body of the request.And of course, we don't have a body when we're using an Http get request.And this is confusing our API controller.It's not able to automatically bind these product parameters.To our method here.So what we need to do is we need to tell our API to go and look for these properties in the query string.And we can do that by specifying the from query attributes here.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 165424.png>)

-So what we need to do now, just to finish off this part is we'll go back to our products with types and brands specification and we'll also add the apply paging in here.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 165827.png>)

-And inside our helpers folder, inside the API, let's create another new class called Pagination.And our pagination. Is going to be used for more than just one class.So we'll make this generic.

![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 171404.png>)
-So we need to think about how we can populate this count property here because we want the count of items after the filters have been applied.
So if somebody asks for a list of boots and they ask for a page size of two, then we want to know how many boots are available in the entire collection.So what this means is if we take a look at our products with types and brands specifications, what we're going to return from this is the page results.So we're not going to know from this class alone how many items are going to be inside that particular What we're going to know is how many items returned after the paging has been applied.So what we really need is another specification class that just handles the filtering and gives us a count of all the items after the filters have been applied.So we need the results of what's contained in our criteria without anything else having been applied to those particular results.And this also means that inside our specification we're going to need to have a method to count the number of items as well.
-So what we'll do is we'll go to our generic repository, first of all.And we'll start to implement this layer inside here.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 172037.png>)
So we'll open up the generic repository and we'll implement the interface so that we get the additional method populated in here.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 172314.png>)
-And then what we want to do is go and create a new specification just so that we can use this specific method in our repository.
-So what we'll do is we'll just go into our Solution Explorer inside the specifications.And we'll create another new class and we'll say product with filters For count specification.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 172745.png>)
*So all we're using this for is just to get the count of items so that we can populate that in our pagination class*
-So now we can make use of this inside our controller as well:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 173518.png>)
-And of course we don't have a constructor in our pagination class yet, so let's go across to our pagination
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 173326.png>)

5.Adding the search functionality

And what we will do for this since we already have filtering capabilities with our specification, this is just going to be another criteria that we're going to send into our specification to be evaluated
and then just return the products that match the criteria.In this case, it's going to be their name contains a certain string and then we'll return the results to the client.
-So what we'll need to do inside the core specifications and our product spec parameters, what we're going to do is add an additional property.
-Even if the user types everything and capitals, we always want it to match against something lowercase.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 174755.png>)
,and:
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 175047.png>)

6.Adding CORS Support to the API

So if a browser wants to load.What we're returning back here, then our server has to explicitly permitted by returning a cause header. Now we're able to get data in Postman because Postman as far as our API is concerned and Postman is not a browser, so Postman doesn't care about cores headers.But our browsers will not because our browsers are capable of being attacked by certain things and they're more careful about which data lay load up.
-So first of all, we'll add the service and the configuration for this service inside here and specify what we are going to allow.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 175923.png>)

-There's the service which we just added, and we also need to add some middleware for this as well.And our middleware is going to go in our program class.
![alt text](<Assets/ReadmeImages/Screenshot 2024-07-26 180052.png>)
