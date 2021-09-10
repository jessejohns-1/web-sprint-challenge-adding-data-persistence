exports.up = async function(knex) {
    await knex.schema
        .createTable("projects",(t)=>{
          //Creates primary key
          t.increments("project_id")
          t.string("project_name", 100).notNullable()
          t.string("project_description", 200)
          t.boolean("project_completed").defaultTo('false')
        })
  
        .createTable("resources",(t)=>{
          //Creates primary key
          t.increments("resource_id")
          t.string("resource_name", 100).notNullable().unique()
          t.string("resource_description", 200)
        })
  
        .createTable("tasks",(t)=>{
          //Creates primary key
          t.increments("task_id")
          t.string("task_description", 200).notNullable()
          t.boolean("task_completed")
          t.string("task_notes", 200)
          t.integer("project_id")
              .unsigned()
              .notNullable()
              .references("project_id")
              .inTable("projects")
              .onDelete("RESTRICT")
              .onUpdate("RESTRICT")
        })
  
        .createTable("project_resources",(t)=>{
          //Creates primary key
          t.increments("project_resources_id")
          t.float("quantity").notNullable()
          //Creates foreign key links to resource
          t.integer("project_id")
              .unsigned()
              .notNullable()
              .references("project_id")
              .inTable("projects")
              .onDelete("RESTRICT")
              .onUpdate("RESTRICT")
          //Creates foreign key links to ingredients
          t.integer("resource_id")
              .unsigned()
              .notNullable()
              .references("resource_id")
              .inTable("resources")
              .onDelete("RESTRICT")
              .onUpdate("RESTRICT")
        })
  };
  
  exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("project_resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects")
  };