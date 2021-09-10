exports.up = async function(knex) {
    await knex.schema
        .createTable("projects",(table)=>{
          //Creates primary key
          table.increments("project_id")
          table.string("project_name", 100).notNullable()
          table.string("project_description", 200)
          table.boolean("project_completed")
        })
  
        .createTable("resources",(table)=>{
          //Creates primary key
          table.increments("resource_id")
          table.string("resource_name", 100).notNullable().unique()
          table.string("resource_description", 200)
        })
  
        .createTable("tasks",(table)=>{
          //Creates primary key
          table.increments("task_id")
          table.string("task_description", 200).notNullable()
          table.boolean("task_completed")
          table.string("task_notes", 200)
          table.integer("project_id")
              .unsigned()
              .notNullable()
              .references("project_id")
              .inTable("projects")
              .onDelete("RESTRICT")
              .onUpdate("RESTRICT")
        })
  
        .createTable("project_resources",(table)=>{
          //Creates primary key
          table.increments("project_resources_id")
          table.float("quantity").notNullable()
          //Creates foreign key links to resource
          table.integer("project_id")
              .unsigned()
              .notNullable()
              .references("project_id")
              .inTable("projects")
              .onDelete("RESTRICT")
              .onUpdate("RESTRICT")
          //Creates foreign key links to ingredients
          table.integer("resource_id")
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